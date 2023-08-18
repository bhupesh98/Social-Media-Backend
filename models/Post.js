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
    postImage: {
        URL: {
            type: String,
            required: true
        },
        publicId: {
            type: String,
            required: true
        }
    },
    category: {
        type: String,
        default: "all"
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