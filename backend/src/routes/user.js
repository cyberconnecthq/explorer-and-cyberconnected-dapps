const jwt = require("express-jwt");
const router = require("express").Router();
const multer = require("multer");
const { verifyJwt } = require("../authorization");

const {
  find,
  register,
  updateUser,
  getUserByUserId,
} = require("../controllers/user/user");

const {
  auth,
} = require("../controllers/user/auth");

const {
  getLikesByUserId,
  getTweetsByUserId,
  getMediaByUserId,
} = require("../controllers/user/tweet");


////////////////////////////////////////////////////////
/** POST /api/user/auth */
router.route('/auth').post(auth);

router.route("/get").get(find);

/** GET /api/user/:uid */
/** Authenticated route */
//router.route("/:uid").get(jwt(config), get);

/** POST /api/user/add */
router.route("/add").post(register);

/** PATCH /api/user/:uid */
/** Authenticated route */
//router.route("/:uid").patch(jwt(config), patch);

////////////////////////////////////////////////////////////////////
/** /api/user  */
//router.post("/add-user", addUser);

const upload = multer();
router.put(
  "/update",
  [verifyJwt, upload.fields([{ name: "avatar" }, { name: "cover" }])],
  updateUser
);

router.get("/get", getUserByUserId);
router.get("/get-tweets", getTweetsByUserId);
router.get("/get-likes", getLikesByUserId);
router.get("/get-media", getMediaByUserId);

//////////////////////////////////////////////////////////////

module.exports = router;
