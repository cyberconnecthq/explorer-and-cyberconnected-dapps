const { Op } = require("sequelize");
const { User } = require("../db");

module.exports = {
  searchUser: async (req, res) => {
    // query -> {search}
    //important lkw
    const users = await User.findAll({
      attributes: ["uid","username", "avatar"],
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
