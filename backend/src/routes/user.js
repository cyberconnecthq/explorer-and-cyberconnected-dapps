const jwt = require("express-jwt");
const { config } = require("../config");
const router = require("express").Router();
const multer = require("multer");
const { verifyJwt } = require("../authorization");

const {
  auth,
  find,
  //get,
  register,
  //patch,
  ///////////////////////
  //addUser,
  updateUser,
  //loginUser,
  getUserByUserId,
  getLikesByUserId,
  getTweetsByUserId,
  getMediaByUserId,
} = require("../controllers/user/user");



////////////////////////////////////////////////////////
/** POST /api/user/auth */
router.route('/auth').post(auth);

router.route("/get").get(find);

/** GET /api/user/:userId */
/** Authenticated route */
//router.route("/:userId").get(jwt(config), get);

/** POST /api/user/add */
router.route("/add").post(register);

/** PATCH /api/user/:userId */
/** Authenticated route */
//router.route("/:userId").patch(jwt(config), patch);

////////////////////////////////////////////////////////////////////
/** /api/user  */
//router.post("/add-user", addUser);

const upload = multer();
router.put(
  "/update",
  [verifyJwt, upload.fields([{ name: "avatar" }, { name: "cover" }])],
  updateUser
);
//router.post("/login-user", loginUser);
router.get("/get-user", getUserByUserId);
router.get("/get-tweets", getTweetsByUserId);
router.get("/get-likes", getLikesByUserId);
router.get("/get-media", getMediaByUserId);

//////////////////////////////////////////////////////////////

module.exports = router;
