const { Comment, Tweet, User } = require("../../db");
const upload = require("../upload");

module.exports = {
  addComment: async (req, res) => {
    // body -> {tweetId, userId, text}
    upload(req.file, req.body.resource_type).then(async (media) => {
      Promise.all([
        await Comment.create({
          tweetId: req.body.tweetId,
          userId: req.body.userId,
          text: req.body.text,
          media: media.secure_url,
        }),
        await Tweet.increment("commentsCount", {
          by: 1,
          where: { id: req.body.tweetId },
        }),
      ]).then((values) => {
        return res.status(200).json({ comment: values[0] });
      });
    });
  },
  removeComment: async (req, res) => {
    // body -> {tweetId, userId, id}
    Promise.all([
      await Comment.destroy({
        where: req.body,
      }),
      await Tweet.decrement("commentsCount", {
        by: 1,
        where: { id: req.body.tweetId },
      }),
    ]).then((values) => {
      return res.status(200).json({ comment: values[0] });
    });
  },
  getTweetComments: async (req, res) => {
    // body -> {tweetId}
    const comments = await User.findAll({
      attributes: ["username", "avatar"],
      include: {
        model: Comment,
        required: true,
        where: req.query,
      },
      order: [[Comment, "createdAt", "DESC"]],
      raw: true,
    });
    return res.status(200).json({ comments });
  },
};
