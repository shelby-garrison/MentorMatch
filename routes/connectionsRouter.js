const express = require("express");
const router = express.Router();
const isloggedin = require("../middlewares/isLoggedIn");
// const productModel = require("../models/product-model")
const userModel = require("../models/user-model")


router.get("/",isloggedin, async function (req, res) {
  let user = await userModel
  .findOne({email: req.user.email})
  .populate("mentorshipConnections.userId");
  let connections = user.mentorshipConnections.map(connection => ({
    userId: connection.userId,  // You can access user's details here
    userSkills: connection.userId.skills,
    userInterests: connection.userId.interests,
    userRole: connection.userId.role,
    userName: connection.userId.fullname, // Assuming the user has a `fullname` field
    userEmail: connection.userId.email, // Assuming the user has an `email` field
    userPicture: connection.userId.picture, // Assuming the sender has a `picture` field
  }));
  res.render("connections", {connections});
});

module.exports = router;

