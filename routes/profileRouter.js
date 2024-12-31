const express = require("express");
const router = express.Router();
const isloggedin = require("../middlewares/isLoggedIn");
const productModel = require("../models/product-model")
const userModel = require("../models/user-model")

router.get("/",isloggedin, function (req, res) {
  let user = req.user;
  let error = req.flash("error");
  res.render("profile", { user,error});
});
   

router.post("/", isloggedin, async function (req, res) {
  const user = await userModel.findById(req.user._id);
  // console.log(user.role)
  try {
    let { skills, interests, role } = req.body;

    if (!skills || skills.length === 0) {
      req.flash("error", "Please Select at least ONE Skill");
      return res.redirect("/profile");
    }

    // Validate interests
    if (!interests || interests.length === 0) {
      req.flash("error", "Please Select at least ONE Interest");
      return res.redirect("/profile");
    }

    // Validate role
    if (!role || role.trim() === '') {
      req.flash("error", "Please Select a Role");
      return res.redirect("/profile");
    }
    
    user.skills = skills;
    user.interests = interests;
    user.role = role;
    
    await user.save();
    res.redirect("/profile")
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = router;