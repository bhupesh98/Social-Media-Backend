const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    require: true,
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