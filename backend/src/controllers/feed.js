const { Op } = require("sequelize");
const { User, Tweet, Follower, sequelize } = require("../db");
const { getMyRetweets, getMyLikes } = require("./user/tweet");

const getMyFollowing = async (uid) => {
  const users = await User.findAll({
    attributes: ["uid"],
    include: {
      model: Follower,
      as: "Following",
      required: true,
      attributes: [],
      where: {
        follower: uid,
      },
    },
    raw: true,
  });
  return users;
};

const getTweets = async (following) => {
  const tweets = await User.findAll({
    attributes: ["uid", "domain", "avatar"],
    include: {
      model: Tweet,
      required: true,
      where: {
        uid: {
          [Op.in]: following,
        },
      },
    },
    raw: true,
  });
  return tweets;
};

const getRetweets = async (following) => {
  const tweetIds = `SELECT Tweets.id from Tweets INNER JOIN Retweets ON Tweets.id = Retweets.tweetId WHERE Retweets.uid IN (${
    following.length ? following.map((el) => "'" + el + "'").toString() : null
  })`;
  const tweets = await User.findAll({
    attributes: ["uid", "domain", "avatar"],
    include: {
      model: Tweet,
      required: true,
      where: {
        id: {
          [Op.in]: sequelize.literal(`(${tweetIds})`),
        },
      },
    },
    raw: true,
  });
  return tweets;
};

const getLikes = async (following) => {
  const tweetIds = `SELECT Tweets.id from Tweets INNER JOIN Likes ON Tweets.id = Likes.tweetId WHERE Likes.uid IN (${
    following.length ? following.map((el) => "'" + el + "'").toString() : null
  })`;
  const tweets = await User.findAll({
    attributes: ["uid", "domain", "avatar"],
    include: {
      model: Tweet,
      required: true,
      where: {
        id: {
          [Op.in]: sequelize.literal(`(${tweetIds})`),
        },
      },
    },
    raw: true,
  });
  return tweets;
};

getFeed = async (req, res) => {
  // query -> {uid}
  const uid=req.query.uid;
  if (!uid) {
    return res.status(400).json({ errors: "uid is required" });
  }

  getMyFollowing(uid).then((response) => {
    const following = [];
    response.forEach((el) => following.push(el.uid));
    Promise.all([
      getTweets(following),
      getRetweets(following),
      getLikes(following),
      getMyLikes(uid),
      getMyRetweets(uid),
    ]).then((values) => {
      let tweets = values[0].concat(values[1]).concat(values[2]);
      const uniqueSet = new Set();
      tweets = tweets.filter((tweet) => {
        if (uniqueSet.has(tweet["Tweets.id"])) {
          return false;
        }
        uniqueSet.add(tweet["Tweets.id"]);
        return true;
      });
      tweets.sort(
        (a, b) =>
          new Date(b["Tweets.createdAt"]) - new Date(a["Tweets.createdAt"])
      );

      let retweetSet = new Set();
      let likeSet = new Set();
      values[3].map((tw) => likeSet.add(tw.tweetId));
      values[4].map((tw) => retweetSet.add(tw.tweetId));

      tweets = tweets.map((tw) => {
        let deepCopy = { ...tw };
        if (likeSet.has(tw["Tweets.id"])) deepCopy.selfLiked = true;
        if (retweetSet.has(tw["Tweets.id"])) deepCopy.selfRetweeted = true;
        return deepCopy;
      });

      return res.status(200).json({ tweets });
    });
  });
};

whoToFollow = async (req, res) => {
  // query -> {uid}
  // Get my following and don't select
  const following = `SELECT Users.uid FROM Users INNER JOIN Followers ON Users.uid = Followers.followed WHERE follower = '${req.query.uid}'`;
  const whoToFollow = await User.findAll({
    attributes: ["uid", "domain", "avatar"],
    where: {
      uid: {
        [Op.not]: req.query.uid,
        [Op.notIn]: sequelize.literal(`(${following})`),
      },
    },
    limit: 8,
  });
  return res.status(200).json({ whoToFollow });
};

module.exports = {
  getFeed,
  whoToFollow,
};
