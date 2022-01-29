const { Op } = require("sequelize");
const bcrypt = require("bcrypt");

const { signJwt } = require("../../authorization");
const { addUserValidation } = require("../../utils/validation");
const { User } = require("../../db");

///////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = {

  get: (req, res, next) => {
    // AccessToken payload is in req.user.payload, especially its `uid` field
    // UserId is the param in /user/:uid
    // We only allow user accessing herself, i.e. require payload.uid==uid
    if (req.user.payload.uid !== +req.query.uid) {
      return res
        .status(401)
        .send({ error: "You can can only access yourself" });
    }
    return User.findByPk(req.query.uid)
      .then((user) => res.json(user))
      .catch(next);
  },

  patch_: (req, res, next) => {
    // Only allow to fetch current user
    if (req.user.payload.uid !== +req.query.uid) {
      return res
        .status(401)
        .send({ error: "You can can only access yourself" });
    }
    return User.findByPk(req.query.uid)
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
              error: `User with uid ${req.query.uid} is not found in database`,
            });
      })
      .catch(next);
  },

  ////////////////////  OLD ///////////////////////////////////////////////////////////////////////////////////////////////////////////


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
          uid: user.uid,
        },
      });
      return res.status(200).json({
        user: {
          uid: user.uid,
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
        uid: user.uid,
      },
    });
    return res.status(200).json({
      user: {
        uid: user.uid,
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


  getUserByUserId_old: async (req, res) => {
    const user = await User.findOne({
      attributes: [
        "uid",
        "username",
        "nonce",
        "bio",
        "avatar",
        "cover",
        "location",
        "birth",
        "createdAt",
      ],
      where: {
        uid: req.query.uid,
      },
    });
    return res.status(200).json(user);
  },

};
