const express = require("express");
const router = express.Router();
const isloggedin = require("../middlewares/isLoggedIn");
// const productModel = require("../models/product-model")
const userModel = require("../models/user-model")



router.get("/",isloggedin, async function (req, res) {
  let user = await userModel
  .findOne({email: req.user.email})
  .populate("mentorshipRequests.senderId");
  let requests = user.mentorshipRequests.map(request => ({
    senderId: request.senderId,  // You can access sender's details here
    senderSkills: request.senderId.skills,
    senderInterests: request.senderId.interests,
    senderRole: request.senderId.role,
    senderName: request.senderId.fullname, // Assuming the sender has a `fullname` field
  }));
  res.render("requests", {requests});
});

module.exports = router;