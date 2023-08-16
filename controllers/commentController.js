const { json } = require('express');
const CommentModel = require('../models/Comment');
const PostModel = require('../models/Post');


const addComment = async (req,res) => {
    try {
        const post = PostModel.findById(req.params.postId);
        if (!post) {
            res.status(404).json({
                message: "Post has been deleted"
            });
        }  
        const comment = req.body;

        comment.user = req.userId;
        comment.postId = req.params.postId;
        const createComment = await new CommentModel(comment);
        const commentSave = await createComment.save();
        console.log(comment.postId);
        await PostModel.updateOne(
            {_id: comment.postId},
            {$push: {
                comment: commentSave._id
        }});
        const {__v,...data} = comment;
        res.status(200).json({
            message: "Comment has been created",
            data: data
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to add comment, Error"
        });
    }
}

const viewComments = async (req,res) => {
    const postId = req.params.postId;
    try {
        const post = await PostModel.findOne({
            _id: postId
        }).populate("comment");
        console.log(post);
        console.log(post.comment);
        if (post) {
            if (post.comment.length) {
                res.status(200).json({
                    comments: post.comment
                });
            }
            else {
                res.status(404).json({
                    message: "No comment Found"
                });
            }
        }
        else {
            res.status(404).json({
                message: "No such Post Exists"
            });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to fetch comments, Error"
        });
    }
}

module.exports = {addComment,viewComments};