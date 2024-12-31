const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  fullname: {
    type: String,
    minLength: 3,
    trim: true,
  },
  email: String,
  password: String,
  role: String,

  skills: {
    type: [String],  
    default: []
},
interests: {
    type: [String],
    default: []
},
 contact: Number,
  picture: String,
  mentorshipRequests: [
    {
      senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }
    
    }
  ],
  mentorshipConnections: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }
  
    }
  ]

});

module.exports = mongoose.model("user", userSchema);