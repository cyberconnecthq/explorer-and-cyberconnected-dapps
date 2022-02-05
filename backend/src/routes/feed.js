const router = require("express").Router();
const { getFeed, whoToFollow } = require("../controllers/feed");
const { verifyJwt } = require("../authorization");

router.get("/", verifyJwt, getFeed);
router.get("/who-to-follow", verifyJwt, whoToFollow);

module.exports = router;
