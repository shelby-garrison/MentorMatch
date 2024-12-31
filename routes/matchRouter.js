const express = require("express");
const router = express.Router();
const isloggedin = require("../middlewares/isLoggedIn");
const productModel = require("../models/product-model")
const userModel = require("../models/user-model")


router.get("/",isloggedin, function (req, res) {
  let users = {};
  res.render("match", {users});
});
     
router.post("/", isloggedin, async function (req, res) {
    const { role, skills, interests } = req.body;
    console.log(role, skills, interests);
    const filter = {};

    if (role) {
      filter.role = role;
    }
  
    if (skills && skills.length > 0) {
      filter.skills = { $in: Array.isArray(skills) ? skills : [skills] };
    }
  
    if (interests && interests.length > 0) {
      filter.interests = { $in: Array.isArray(interests) ? interests : [interests] };
    }
    if (req.user && req.user._id) {
      filter._id = { $ne: req.user._id }; // $ne means "not equal"
    }

    try {
      
       let users = await userModel.find(filter);
      res.render("match", { users });
    } catch (err) {
      res.status(500).send("Error fetching users: " + err.message);
    }
  });


module.exports = router;
