const jwt = require("jsonwebtoken");

module.exports = {
  signJwt: (user, callback) => {
    jwt.sign(
      {
        user: {
          //publicAddress: user.publicAddress,
          //nonce: user.nonce,
          id: user.id,
        },
      },
      process.env.SECRET_KEY,
      callback
    );
    //return token;
  },
  verifyJwt: (req, res, next) => {
    const bearerHeader = req.headers["authorization"];
    if (!bearerHeader) return res.status(403).json({ error: "Forbidden" });

    const bearerToken = bearerHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(bearerToken, process.env.SECRET_KEY);
      req.decoded = decoded;
      next();
    } catch (err) {
      console.error(err);
      return res.status(403).json({ error: "Forbidden" });
    }
  },
};
