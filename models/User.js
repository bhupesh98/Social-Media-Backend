const mongoose = require("mongoose");
const websiteURL = require('../config/envConfig');

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    max: 40,
    default: ""
  },
  profilePicture: {
    type: String,
    default: `${websiteURL}/uploads/profilePhoto/defaultProfile.png`
  },
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],
  followings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }]
});

module.exports = mongoose.model("User", UserSchema);
