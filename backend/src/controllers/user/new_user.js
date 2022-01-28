//import { NextFunction, Request, Response } from 'express';
const { User } = require("../../db");
const { signJwt } = require("../../authorization");

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
    User.create(req.body)
      .then((user) => {
        return res.json(user);
      })
      .catch(next);
  },
  register1: (req, res, next) => {
    User.create(req.body)
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
            dob: user.dob,
            location: user.location,
            bio: user.bio,
            token,
          },
        });
      })
      .catch(next);
  },

  get: (req, res, next) => {
    // AccessToken payload is in req.user.payload, especially its `id` field
    // UserId is the param in /user/:userId
    // We only allow user accessing herself, i.e. require payload.id==userId
    if (req.user.payload.id !== +req.params.userId) {
      return res
        .status(401)
        .send({ error: "You can can only access yourself" });
    }
    return User.findByPk(req.params.userId)
      .then((user) => res.json(user))
      .catch(next);
  },

  patch: (req, res, next) => {
    // Only allow to fetch current user
    if (req.user.payload.id !== +req.params.userId) {
      return res
        .status(401)
        .send({ error: "You can can only access yourself" });
    }
    return User.findByPk(req.params.userId)
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
              error: `User with publicAddress ${req.params.userId} is not found in database`,
            });
      })
      .catch(next);
  },
};
