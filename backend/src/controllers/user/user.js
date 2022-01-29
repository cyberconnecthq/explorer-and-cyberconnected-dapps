//import { NextFunction, Request, Response } from 'express';
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const { recoverPersonalSignature } = require("eth-sig-util");
const { bufferToHex } = require("ethereumjs-util");

const { signJwt } = require("../../authorization");
const { addUserValidation } = require("../../utils/validation");
const upload = require("../upload");
//const { config } = require("../../config");
const { User } = require("../../db");

const {
  getMyRetweets,
  getMyLikes,
  getLikedTweets,
  getUserTweets,
  getUserRetweets,
} = require("./extra");

///////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = {
  find: (req, res, next) => {
    // If a query string ?publicAddress=... is given, then filter results
    const whereClause =
      req.query && req.query.publicAddress
        ? {
            where: { publicAddress: req.query.publicAddress },
          }
        : undefined;

    return User.findAll(whereClause)
      .then((users) => {
        return res.json(users);
      })
      .catch(next);
  },

  register: (req, res, next) => {
    /*
    User.create(req.body)
      .then((user) => {
        return res.json(user);
      })
      .catch(next);
      */
    User.create(req.body)
      .then((user) => {
        return res.status(200).json({
          user: {
            id: user.id,
            username: user.username,
            nonce: user.nonce,
            publicAddress: user.publicAddress,
            avatar: user.avatar,
            cover: user.cover,
            birth: user.birth,
            location: user.location,
            bio: user.bio,
            //token,
          },
        });
      })
      .catch(next);
  },
  /*
  get: (req, res, next) => {
    // AccessToken payload is in req.user.payload, especially its `id` field
    // UserId is the param in /user/:userId
    // We only allow user accessing herself, i.e. require payload.id==userId
    if (req.user.payload.id !== +req.query.userId) {
      return res
        .status(401)
        .send({ error: "You can can only access yourself" });
    }
    return User.findByPk(req.query.userId)
      .then((user) => res.json(user))
      .catch(next);
  },
*/
  auth: (req, res, next) => {
    const { signature, publicAddress } = req.body;
    if (!signature || !publicAddress)
      return res
        .status(400)
        .send({ error: "Request should have signature and publicAddress" });

    return (
      User.findOne({ where: { publicAddress } })
        ////////////////////////////////////////////////////
        // Step 1: Get the user with the given publicAddress
        ////////////////////////////////////////////////////
        .then((user) => {
          if (!user) {
            res.status(401).send({
              error: `User with publicAddress ${publicAddress} is not found in database`,
            });

            return null;
          }

          return user;
        })
        ////////////////////////////////////////////////////
        // Step 2: Verify digital signature
        ////////////////////////////////////////////////////
        .then((user) => {
          if (!(user instanceof User)) {
            // Should not happen, we should have already sent the response
            throw new Error(
              'User is not defined in "Verify digital signature".'
            );
          }

          const msg = `I am signing my one-time nonce: ${user.nonce}`;

          // We now are in possession of msg, publicAddress and signature. We
          // will use a helper from eth-sig-util to extract the address from the signature
          const msgBufferHex = bufferToHex(Buffer.from(msg, "utf8"));
          const address = recoverPersonalSignature({
            data: msgBufferHex,
            sig: signature,
          });

          // The signature verification is successful if the address found with
          // sigUtil.recoverPersonalSignature matches the initial publicAddress
          if (address.toLowerCase() === publicAddress.toLowerCase()) {
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
        .then((user) => {
          if (!(user instanceof User)) {
            // Should not happen, we should have already sent the response

            throw new Error(
              'User is not defined in "Generate a new nonce for the user".'
            );
          }

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
              id: user.id,
              username: user.username,
              nonce: user.nonce,
              publicAddress: user.publicAddress,
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

  patch_: (req, res, next) => {
    // Only allow to fetch current user
    if (req.user.payload.id !== +req.query.userId) {
      return res
        .status(401)
        .send({ error: "You can can only access yourself" });
    }
    return User.findByPk(req.query.userId)
      .then((user) => {
        if (!user) {
          return user;
        }

        Object.assign(user, req.body);
        return user.save();
      })
      .then((user) => {
        return user
          ? res.json(user)
          : res.status(401).send({
              error: `User with publicAddress ${req.query.userId} is not found in database`,
            });
      })
      .catch(next);
  },

  ////////////////////  OLD ///////////////////////////////////////////////////////////////////////////////////////////////////////////

  tweetAttributes: [
    "id",
    "text",
    "media",
    "commentsCount",
    "retweetsCount",
    "likesCount",
    "createdAt",
  ],
  addUser_old: async (req, res) => {
    // Joi validation checks
    const validation = addUserValidation(req.body);
    if (validation.error)
      return res.status(400).json({ errors: validation.error.details });

    try {
      // Create password hash
      let saltRounds = 10;
      const hash = await bcrypt.hash(req.body.password, saltRounds);
      req.body.password = hash;

      // Add user to User model
      const user = await User.create(req.body);

      const token = signJwt({
        user: {
          id: user.id,
        },
      });
      return res.status(200).json({
        user: {
          id: user.id,
          username: user.username,
          avatar: user.avatar,
          cover: user.cover,
          birth: user.birth,
          location: user.location,
          bio: user.bio,
          token,
        },
      });
    } catch (err) {
      let errors = {};
      err.errors.map((e) => {
        if (e.path === "users.username" && e.validatorKey === "not_unique")
          errors.username = "Username is taken";
        if (e.path === "users.email" && e.validatorKey === "not_unique")
          errors.email = "Email id is already registered";
      });
      return res.status(400).json({ errors });
    }
  },
  updateUser: async (req, res) => {
    // body -> {id, birth, media}
    const avatar = req.files.avatar ? req.files.avatar[0] : null;
    const cover = req.files.cover ? req.files.cover[0] : null;
    Promise.all([upload(avatar, "image"), upload(cover, "image")]).then(
      async (photos) => {
        const obj = {
          bio: req.body.bio,
          location: req.body.location,
          birth: req.body.birth,
        };
        if (photos[0].secure_url) obj.avatar = photos[0].secure_url;
        if (photos[1].secure_url) obj.cover = photos[1].secure_url;
        try {
          const user = await User.update(obj, {
            where: { id: req.body.userId },
          });
          return res.status(200).json({ user: obj });
        } catch (error) {
          return res.status(400).json({ errors: error });
        }
      }
    );
  },
  loginUser_old: async (req, res) => {
    const user = await User.findOne({
      where: {
        [Op.or]: [{ username: req.body.user }, { email: req.body.user }],
      },
      raw: true,
    });
    if (!user)
      return res.status(401).json({ user: "Incorrect username/email" });

    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) return res.status(401).json({ password: "Incorrect password" });

    const token = signJwt({
      user: {
        id: user.id,
      },
    });
    return res.status(200).json({
      user: {
        id: user.id,
        username: user.username,
        avatar: user.avatar,
        cover: user.cover,
        birth: user.birth,
        location: user.location,
        bio: user.bio,
        token,
      },
    });
  },

  getUserByUserId: async (req, res, next) => {
    return User.findByPk(req.query.userId)
      .then((user) => {
        return res.status(200).json({
          id: user.id,
          username: user.username,
          nonce: user.nonce,
          publicAddress: user.publicAddress,
          bio: user.bio,
          avatar: user.avatar,
          cover: user.cover,
          location: user.location,
          birth: user.birth,
          createdAt: user.createdAt,
        });
      })
      .catch(next);
  },

  getUserByUserId_old: async (req, res) => {
    const user = await User.findOne({
      attributes: [
        "id",
        "username",
        "nonce",
        "publicAddress",
        "bio",
        "avatar",
        "cover",
        "location",
        "birth",
        "createdAt",
      ],
      where: {
        id: req.query.userId,
      },
    });
    return res.status(200).json(user);
  },

  getTweetsByUserId: async (req, res) => {
    // body -> {userId, myId}
    /* 
      1. Get tweets, retweets made by user. Get tweetIds retweeted and liked by me
      2. Add tweetIds of retweets and likes in 2 Sets
      3. Map over all tweets to add selfRetweeted -> true and selfLiked -> true
    */
    Promise.all([
      getUserTweets(req.query.userId, module.exports.tweetAttributes),
      getUserRetweets(req.query.userId, module.exports.tweetAttributes),
      getMyLikes(req.query.myId),
      getMyRetweets(req.query.myId),
    ]).then((values) => {
      const likeSet = new Set();
      const retweetSet = new Set();
      values[2].map((tweet) => likeSet.add(tweet.tweetId));
      values[3].map((tweet) => retweetSet.add(tweet.tweetId));
      let retweets = values[1].map((retweet) => ({
        ...retweet,
        isRetweet: true,
      }));
      let tweets = values[0].concat(retweets);
      const uniqueSet = new Set();
      tweets = tweets.filter((tweet) => {
        if (uniqueSet.has(tweet["Tweets.id"])) return false;
        uniqueSet.add(tweet["Tweets.id"]);
        return true;
      });
      tweets.sort(
        (a, b) =>
          new Date(b["Tweets.createdAt"]) - new Date(a["Tweets.createdAt"])
      );

      tweets = tweets.map((tweet) => {
        let deepCopy = { ...tweet };
        if (retweetSet.has(tweet["Tweets.id"])) deepCopy.selfRetweeted = true;
        if (likeSet.has(tweet["Tweets.id"])) deepCopy.selfLiked = true;
        return deepCopy;
      });
      res.status(200).json({ tweets });
    });
  },
  getLikesByUserId: async (req, res) => {
    // body -> {userId, myId}
    /* 
      1. Get tweets liked by user and tweetIds retweeted and liked by me
      2. Add tweetIds of retweets and likes (and retweets by user) in 3 Sets
      3. Map over liked tweets to add selfRetweeted -> true and selfLiked -> true and isRetweet -> true
    */

    Promise.all([
      getLikedTweets(req.query.userId, module.exports.tweetAttributes),
      getMyRetweets(req.query.myId),
      getMyLikes(req.query.myId),
      getMyRetweets(req.query.userId),
    ]).then((values) => {
      let likedTweets = values[0];
      const retweetSet = new Set();
      const likeSet = new Set();
      const userRetweetSet = new Set();
      values[1].map((tweet) => retweetSet.add(tweet.tweetId));
      values[2].map((tweet) => likeSet.add(tweet.tweetId));
      values[3].map((tweet) => userRetweetSet.add(tweet.tweetId));
      likedTweets = likedTweets.map((tweet) => {
        let deepCopy = { ...tweet };
        if (retweetSet.has(tweet["Tweets.id"])) deepCopy.selfRetweeted = true;
        if (likeSet.has(tweet["Tweets.id"])) deepCopy.selfLiked = true;
        if (userRetweetSet.has(tweet["Tweets.id"])) deepCopy.isRetweet = true;
        return deepCopy;
      });
      return res.status(200).json({ tweets: likedTweets });
    });
  },
  getMediaByUserId: async (req, res) => {
    // body -> {userId, myId}
    Promise.all([
      getUserTweets(req.query.userId, module.exports.tweetAttributes),
      getUserRetweets(req.query.userId, module.exports.tweetAttributes),
      getMyLikes(req.query.myId),
      getMyRetweets(req.query.myId),
    ]).then((values) => {
      const likeSet = new Set();
      const retweetSet = new Set();
      values[2].map((tweet) => likeSet.add(tweet.tweetId));
      values[3].map((tweet) => retweetSet.add(tweet.tweetId));
      let retweets = values[1].map((retweet) => ({
        ...retweet,
        isRetweet: true,
      }));
      let tweets = values[0].concat(retweets);
      const uniqueSet = new Set();
      tweets = tweets.filter((tweet) => {
        if (uniqueSet.has(tweet["Tweets.id"])) return false;
        if (!tweet["Tweets.media"]) return false;
        uniqueSet.add(tweet["Tweets.id"]);
        return true;
      });
      tweets.sort(
        (a, b) =>
          new Date(b["Tweets.createdAt"]) - new Date(a["Tweets.createdAt"])
      );

      tweets = tweets.map((tweet) => {
        let deepCopy = { ...tweet };
        if (retweetSet.has(tweet["Tweets.id"])) deepCopy.selfRetweeted = true;
        if (likeSet.has(tweet["Tweets.id"])) deepCopy.selfLiked = true;
        return deepCopy;
      });
      res.status(200).json({ tweets });
    });
  },
};
