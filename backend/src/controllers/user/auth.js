const { recoverPersonalSignature } = require("eth-sig-util");
const { bufferToHex } = require("ethereumjs-util");

const { signJwt } = require("../../authorization");
const upload = require("../upload");
const { User } = require("../../db");

///////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = {
  auth: (req, res, next) => {
    const { signature, uid } = req.body;
    if (!signature || !uid)
      return res
        .status(400)
        .send({ error: "Request should have signature and uid" });

    return (
      User.findOne({ where: { uid } })
        ////////////////////////////////////////////////////
        // Step 1: Get the user with the given id
        ////////////////////////////////////////////////////
        .then((user) => {
          if (!user) {
            res.status(401).send({
              error: `User with id ${uid} is not found in database`,
            });
            throw new Error(`User with id ${uid} is not found in database`);
          }

          return user;
        })
        ////////////////////////////////////////////////////
        // Step 2: Verify digital signature
        ////////////////////////////////////////////////////
        .then(async (user) => {
         const SIGN_MSG = `CCTwitter Login: ${user.nonce}`;

          // We now are in possession of msg, id and signature. We
          // will use a helper from eth-sig-util to extract the address from the signature
          const msgBufferHex = bufferToHex(Buffer.from(SIGN_MSG, "utf8"));
          let _recover = recoverPersonalSignature({
            //0x...
            data: msgBufferHex,
            sig: signature,
          });

          // The signature verification is successful if the address found with
          // sigUtil.recoverPersonalSignature matches the initial id
          const recover = _recover.substring(2).toUpperCase(); //0x
          if (recover === uid) {
            return user;
          } else {
            res.status(401).send({
              error: "Signature verification failed",
            });

            return null;
          }
        })
        ////////////////////////////////////////////////////
        // Step 3: Generate a new nonce for the user
        ////////////////////////////////////////////////////
        .then(async (user) => {
          user.nonce = Math.floor(Math.random() * 10000);
          return user.save();
        })
        ////////////////////////////////////////////////////
        // Step 4: Create JWT
        ////////////////////////////////////////////////////
        .then((user) => {
          return new Promise((resolve, reject) =>
            signJwt(user, (err, token) => {
              if (err) {
                return reject(err);
              }
              if (!token) {
                return new Error("Empty token");
              }
              return resolve({ token: token, user: user });
            })
          );
        })
        .then(({ token, user }) => {
          return res.status(200).json({
            user: {
              uid: user.uid,
              domain: user.domain,
              nonce: user.nonce,
              avatar: user.avatar,
              cover: user.cover,
              birth: user.birth,
              location: user.location,
              bio: user.bio,
              token,
            },
          });
        })
        .catch(next)
    );
  },
};
