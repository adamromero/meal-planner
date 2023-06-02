const express = require("express");
const router = express.Router();
const {
   registerUser,
   loginUser,
   updatePassword,
} = require("../controllers/userController");

router.route("/").post(registerUser).put(updatePassword);

router.route("/login").post(loginUser);

module.exports = router;
