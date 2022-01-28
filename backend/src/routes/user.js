const jwt = require("express-jwt");
const { config } = require("../config");
const new_user = require("../controllers/user/new_user");

const router = require("express").Router();
const multer = require("multer");
const upload = multer();
const {
  addUser,
  editUser,
  loginUser,
  getUserByUsername,
  getLikesByUserId,
  getTweetsByUserId,
  getMediaByUserId,
} = require("../controllers/user/old_user");
const { verifyJwt } = require("../authorization");

/** /api/user  */
router.post("/add-user", addUser);
router.put(
  "/edit-user",
  [verifyJwt, upload.fields([{ name: "avatar" }, { name: "cover" }])],
  editUser
);
router.post("/login-user", loginUser);
router.get("/get-user", getUserByUsername);
router.get("/get-tweets", getTweetsByUserId);
router.get("/get-likes", getLikesByUserId);
router.get("/get-media", getMediaByUserId);

//////////////////////////////////////////////////////////////
router.route("/").get(new_user.find);

/** GET /api/user/:userId */
/** Authenticated route */
router.route("/:userId").get(jwt(config), new_user.get);

/** POST /api/user/add */
router.route("/add").post(new_user.register);

/** PATCH /api/user/:userId */
/** Authenticated route */
router.route("/:userId").patch(jwt(config), new_user.patch);

module.exports = router;
