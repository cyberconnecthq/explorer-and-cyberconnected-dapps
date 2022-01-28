const { Op } = require("sequelize");
const { User } = require("../db");

module.exports = {
  searchUser: async (req, res) => {
    // query -> {search}
    const users = await User.findAll({
      attributes: ["id","username", "avatar"],
      where: {
        [Op.or]: {
          username: {
            [Op.substring]: req.query.search,
          },
        },
      },
    });
    return res.status(200).json({ users });
  },
};
