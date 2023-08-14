const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    caption: {
        type: String,
        max: 150,
        default: ""
    },
    imageURL: {
        type: String,
        require: true
    },
    likes: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    comment: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }]
},
{ 
    timestamps: true
});

module.exports = mongoose.model("Post", postSchema);