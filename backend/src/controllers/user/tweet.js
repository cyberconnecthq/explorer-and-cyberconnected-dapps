const { Op } = require("sequelize");
const { Retweet, Like, User, Tweet, sequelize } = require("../../db");

const getMyRetweets = async (uid) => {
  const retweets = await Retweet.findAll({
    attributes: ["tweetId"],
    where: {
      uid: uid,
    },
    raw: true,
  });
  return retweets;
};
const getMyLikes = async (uid) => {
  const likes = await Like.findAll({
    attributes: ["tweetId"],
    where: {
      uid: uid,
    },
    raw: true,
  });
  return likes;
};
const getLikedTweets = async (uid, tweetAttributes) => {
  const sql = `select Likes.tweetId from Likes inner join Users on Users.uid=Likes.uid where Users.uid='${uid}'`;
  const tweets = await User.findAll({
    attributes: ["uid", "username", "avatar"],
    include: {
      model: Tweet,
      required: true,
      attributes: tweetAttributes,
      where: {
        id: {
          [Op.in]: sequelize.literal(`(${sql})`),
        },
      },
    },
    raw: true,
  });
  return tweets;
};

const getUserTweets = async (uid, tweetAttributes) => {
  let tweets = await User.findAll({
    attributes: ["uid", "username", "avatar"],
    include: {
      model: Tweet,
      required: true,
      attributes: tweetAttributes,
      where: {
        uid: uid,
      },
    },
    raw: true,
  });
  return tweets;
};

const getUserRetweets = async (uid, tweetAttributes) => {
  const sql = `select Retweets.tweetId from Retweets inner join Tweets on Tweets.id=Retweets.tweetId where Retweets.uid='${uid}'`;
  let retweets = await User.findAll({
    attributes: ["uid", "username", "avatar"],
    include: {
      model: Tweet,
      required: true,
      attributes: tweetAttributes,
      where: {
        id: {
          [Op.in]: sequelize.literal(`(${sql})`),
        },
      },
    },
    raw: true,
  });
  return retweets;
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = {
  tweetAttributes: [
    "id",
    "text",
    "media",
    "commentsCount",
    "retweetsCount",
    "likesCount",
    "createdAt",
  ],

  getMyRetweets,
  getMyLikes,
  getLikedTweets,
  getUserTweets,
  getUserRetweets,

  getTweetsByUserId: async (req, res) => {
    // body -> {uid, myId}
    /* 
      1. Get tweets, retweets made by user. Get tweetIds retweeted and liked by me
      2. Add tweetIds of retweets and likes in 2 Sets
      3. Map over all tweets to add selfRetweeted -> true and selfLiked -> true
    */
    Promise.all([
      getUserTweets(req.query.uid, module.exports.tweetAttributes),
      getUserRetweets(req.query.uid, module.exports.tweetAttributes),
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
    // body -> {uid, myId}
    /* 
      1. Get tweets liked by user and tweetIds retweeted and liked by me
      2. Add tweetIds of retweets and likes (and retweets by user) in 3 Sets
      3. Map over liked tweets to add selfRetweeted -> true and selfLiked -> true and isRetweet -> true
    */

    Promise.all([
      getLikedTweets(req.query.uid, module.exports.tweetAttributes),
      getMyRetweets(req.query.myId),
      getMyLikes(req.query.myId),
      getMyRetweets(req.query.uid),
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
    // body -> {uid, myId}
    Promise.all([
      getUserTweets(req.query.uid, module.exports.tweetAttributes),
      getUserRetweets(req.query.uid, module.exports.tweetAttributes),
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
