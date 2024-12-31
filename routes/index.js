const express = require("express");
const router = express.Router();
const isloggedin = require("../middlewares/isLoggedIn");
const productModel = require("../models/product-model")
const userModel = require("../models/user-model")

router.get("/", function (req, res) {
  let error = req.flash("error");
  res.render("index", { error, loggedIn: false});
});



 router.post("/send-request", isloggedin, async function (req, res) {
    const sender = await userModel.findById(req.user._id); //ME
    const receiver = await userModel
    .findById(req.body.userId)
    
    // console.log(sender._id)
    // console.log(receiver.mentorshipRequests)
    try {
      const requestExists = sender.mentorshipRequests.some(request =>
        request.senderId.toString() === receiver._id.toString() // Adjust based on actual structure
    );
      const alreadyRequested = receiver.mentorshipRequests.some(request =>
        request.senderId.toString() === sender._id.toString() // Adjust based on actual structure
    );
    const connectionExists = sender.mentorshipConnections.some(connection =>
      connection.userId.toString() === receiver._id.toString() // Adjust based on actual structure
  );
  if(connectionExists)
    {
     return res.status(400).json({ message: "This user is already a connection!"});
 
     } 
  
   if(requestExists)
   {
    return res.status(400).json({ message: "You have already received a request from this user"});

    } 
    if (alreadyRequested) {
      

      return res.status(400).json({ message: "You have already sent a request." });
  } else {
      receiver.mentorshipRequests.push(({ senderId: sender._id })); // Push the entire sender object
      await receiver.save(); // Save the updated receiver document
      return res.status(200).json({ message: "Request Sent" });
  }
  
 
    
    } 
    catch (err) {
      res.status(500).send(err.message);  // Send a proper error response
    }
  });

 router.post("/handle-request", isloggedin, async function (req, res) {
    const receiver = await userModel.findById(req.user._id); //ME
    const sender = await userModel //OTHER
    .findById(req.body.senderId)
    try {
       if(req.body.action === "accept")
       {
        receiver.mentorshipConnections.push(({ userId: sender._id }))
        sender.mentorshipConnections.push(({ userId: receiver._id }))
        receiver.mentorshipRequests = receiver.mentorshipRequests.filter(
          (request) => request.senderId.toString() != sender._id.toString()
      );
      
      await receiver.save();
      await sender.save();
      console.log(receiver.mentorshipRequests);
      res.status(200).json({ message: "Request accepted successfully!" });
    }
   else if(req.body.action === "decline")
      {
       
       receiver.mentorshipRequests = receiver.mentorshipRequests.filter(
         (request) => request.senderId.toString() != sender._id.toString()
     );
     await receiver.save();
     res.status(200).json({ message: "Request declined successfully!" });
   }
    else {
      res.status(400).json({ message: "Invalid action specified." });
  }
} catch (err) {
  res.status(500).send(err.message);  // Send a proper error response
}
  });

 
  router.post("/remove-connection", isloggedin, async function (req, res) {
    const me = await userModel.findById(req.user._id); //ME
    const other = await userModel //OTHER
    .findById(req.body.connectionId)
    console.log(me.fullname, other.fullname)
    try {
      
       me.mentorshipConnections = me.mentorshipConnections.filter(
          (connection) => !connection.userId.equals(other._id)
      );
       
      other.mentorshipConnections = other.mentorshipConnections.filter(
        (connection) => !connection.userId.equals(me._id)
    );

      await me.save();
      await other.save();
      res.status(200).json({ message: "Connection removed successfully!" });
    
  
} catch (err) {
  res.status(500).send(err.message);  // Send a proper error response
}
  });


module.exports = router;