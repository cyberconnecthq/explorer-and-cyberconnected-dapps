const router = require("express").Router();
const { getFeed, whoToFollow: whoFollow } = require("../controllers/feed");
const { verifyJwt } = require("../authorization");

router.get("/", verifyJwt, getFeed);
router.get("/who-to-follow", verifyJwt, whoFollow);

module.exports = router;
