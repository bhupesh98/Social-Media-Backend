const mongoose = require("mongoose");

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
    default: `localhost:${process.env.PORT}/uploads/profilePhoto/defaultProfile.png`
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