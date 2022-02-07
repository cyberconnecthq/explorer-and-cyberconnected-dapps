/**
 * 
 */

const router = require("express").Router();
const {
  followUser,
  getDetails,
  getFollowings,
} = require("../controllers/follower");
const { verifyJwt } = require("../authorization");

router.post("/", verifyJwt, followUser);
router.get("/details", getDetails);
router.get("/followings-by-uid", getFollowings);

module.exports = router;
