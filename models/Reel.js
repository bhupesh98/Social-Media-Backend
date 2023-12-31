const mongoose = require("mongoose");

const reelSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    caption: {
        type: String,
        max: 150,
        default: ""
    },
    reelVideo: {
        URL: {
            type: String,
            required: true
        },
        publicId: {
            type: String,
            required: true
        }
    },
    likes: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
},
{ 
    timestamps: true
});

module.exports = mongoose.model("Reel", reelSchema);