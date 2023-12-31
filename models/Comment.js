const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    postId: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        max: 100,
        required: true
    }
},
{
    timestamps: true
})

module.exports = mongoose.model("Comment",commentSchema);