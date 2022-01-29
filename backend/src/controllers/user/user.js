const upload = require("../upload");
const { User } = require("../../db");

///////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = {
  find: (req, res, next) => {
    // If a query string ?id=... is given, then filter results
    const whereClause =
      req.query && req.query.uid
        ? {
            where: { uid: req.query.uid },
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
            uid: user.uid,
            username: user.username,
            nonce: user.nonce,
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

  ////////////////////  OLD ///////////////////////////////////////////////////////////////////////////////////////////////////////////

  
  updateUser: async (req, res) => {
    // body -> {uid, birth, media}
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
            where: { uid: req.body.uid },
          });
          return res.status(200).json({ user: obj });
        } catch (error) {
          return res.status(400).json({ errors: error });
        }
      }
    );
  },

  getUserByUserId: async (req, res, next) => {
    return User.findByPk(req.query.uid)
      .then((user) => {
        return res.status(200).json({
          uid: user.uid,
          username: user.username,
          nonce: user.nonce,
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
};
