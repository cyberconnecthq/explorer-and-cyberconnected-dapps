/**
 * 
 */

const { User, Follower } = require("../db");

const _getFollowers = async (uid) => {
  const followers = await User.findAll({
    attributes: ["uid", "domain", "email", "avatar", "bio"],
    include: {
      model: Follower,
      as: "Followers",
      required: true,
      attributes: [],
      where: {
        followed: uid,
      },
    },
    raw: true,
  });
  return followers;
};

const _getFollowings = async (uid) => {
  const following = await User.findAll({
    attributes: ["uid", "domain", "email", "avatar", "bio"],
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
  return following;
};

const followUser = async (req, res) => {
  // body -> {followedId, followerId}
  const body = {
    followed: req.body.followedId,
    follower: req.body.followerId,
  };
  const alreadyFollowing = await Follower.findOne({
    where: body,
  });

  return alreadyFollowing
    ? res.status(200).json(await Follower.destroy({ where: body }))
    : res.status(200).json(await Follower.create(body));
};

const getDetails = async (req, res) => {
  // body -> {id, myId}
  // Get Followers and Following
  const values = await Promise.all([
    _getFollowers(req.query.uid),
    _getFollowings(req.query.uid),
    _getFollowers(req.query.myId),
    _getFollowings(req.query.myId),
  ]);
  let followers = values[0];
  let following = values[1];
  const followersSet = new Set();
  const followingSet = new Set();
  values[2].map((_user) => followersSet.add(_user.uid));
  values[3].map((_user) => followingSet.add(_user.uid));
  followers = followers.map((_user) => {
    let deepCopy = { ..._user };
    if (followersSet.has(_user.uid)) deepCopy.isFollower = true;
    if (followingSet.has(_user.uid)) deepCopy.isFollowing = true;
    return deepCopy;
  });
  following = following.map((_user) => {
    let deepCopy = { ..._user };
    if (followersSet.has(_user.uid)) deepCopy.isFollower = true;
    if (followingSet.has(_user.uid)) deepCopy.isFollowing = true;
    return deepCopy;
  });
  return res.status(200).json({
    followers,
    following,
  });
};

const getFollowings = async (req, res) => {
  const followings = await _getFollowings(req.query.uid);
  return res.status(200).json({
    followings,
  });
};

module.exports = {
  followUser,
  getDetails,
  getFollowings,
};
