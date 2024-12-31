const express = require("express");
const router = express.Router();
const isloggedin = require("../middlewares/isLoggedIn");
const {
  registerUser,
  loginUser,
  logout,
  registerProfile
} = require("../controllers/authController");

// router.post("/profile", registerProfile);
router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/logout", logout);

module.exports = router;