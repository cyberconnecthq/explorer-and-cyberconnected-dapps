const auth = require("../controllers/auth/index");

const router = require("express").Router();

/** POST /api/auth */
router.route('/').post(auth.auth);

module.exports = router;