const { Op } = require("sequelize");
const { User } = require("../db");

module.exports = {
  searchUser: async (req, res) => {
    // query -> {search}
    //important lkw
    const users = await User.findAll({
      attributes: ["uid","domain", "avatar"],
      where: {
        [Op.or]: {
          domain: {
            [Op.substring]: req.query.search,
          },
        },
      },
    });
    return res.status(200).json({ users });
  },
};
