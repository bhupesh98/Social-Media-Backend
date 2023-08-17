const PostModel = require('../models/Post');
const CommentModel = require('../models/Comment');
const fs = require('fs');
const mongoose = require('mongoose');

const createPost = async (req,res) => {
    try {
        // Adding user in post's user
        req.body.user = req.userId;
        req.body.imageURL = req.imageURL;
        const newPost = await new PostModel(req.body);
        await newPost.save();
        const {user,__v,...data} = newPost._doc;
        res.status(200).json({
            message: "Post has been created",
            data: data
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to add post, Error"
        });
    }
};

const deletePost = async (req,res) => {
    // using postId to get post to delete it
    try {
        const postDelete = await PostModel.findById(req.params.postId);
        if (postDelete) {
            if (req.userId === postDelete.user.toString()) {
                // Since comments are stored in different document which are stored referenced here.
                //  So, comment needs to be deleted first.
                const filename = postDelete.imageURL.split('/').pop();
                fs.unlink(`./uploads/posts/${filename}`,(err) => {});
                await CommentModel.deleteMany({
                    postId: postDelete._id
                });
                await PostModel.findByIdAndDelete(req.params.postId);
                
                res.status(200).json({
                    message: "Post has been deleted",
                });
            }
            else {
                res.status(401).json({
                    message: "Unauthorized"
                });
            }
        }
        else {
            res.status(404).json({
                message: "Post doesn't exists"
            })
        }
    } catch(error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to delete post, Error"
        });
    }
};

const getPost = async (req,res) => {
    try {
        const viewPost = await PostModel.findById(req.params.postId).populate("comment");
        if (viewPost) {
            const {__v,user,...data} = viewPost._doc;
            res.status(200).json(data);
        }
        else {
            res.status(404).json({
                message: "Post not Found"
            });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to get post, Error"
        });
    }
};
const likeUnlikePost = async (req,res) => {
    try {
        const post = await PostModel.findById(req.params.postId);
        if (!post.likes.includes(req.userId)) {
            await post.updateOne({ 
                $push: { likes: req.userId } });
            res.status(200).json({
                message: "Post has been liked",
                numberOfLikes: post.likes.length + 1
            });
        } else {
            await PostModel.updateOne({
                $pull: { likes: req.userId } });
            res.status(200).json({
                message: "Post has been unliked",
                numberOfLikes: post.likes.length - 1
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: "Failed to interact with likes, Error",
        });
    }
};

const allPost = async (req,res) => {
    try {
        const posts = await PostModel.find({
            user: req.params.userId
        })
        if (posts.length) {
            res.status(200).json({
                posts: posts
            });
        }
        else {
            res.status(404).json({
                message: "No posts Found",
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: "Failed to fetch all posts, Error",
        });
    }
}

const communityPost = async (req,res) => {
    try {
        let posts,lastPostId;
        if (req.cookies.lastPostId) {
            lastPostId = new mongoose.Types.ObjectId(req.cookies.lastPostId);
        }
        else {
            lastPostId = null;
        }
        let query = {};
        if (lastPostId !== null) {
            query._id = { $lt: lastPostId };
        }
        if (req.params.category == "all") {
            posts = await PostModel.find(query).sort({ _id: -1}).limit(20);
        }
        else {
            query.category = req.params.category;
            posts = await PostModel.find(query).sort({ _id: -1}).limit(20);
        }
        if (posts.length) {
            res.cookie("lastPostId",posts.pop()._id.toString());
            res.status(200).json({
                posts: posts
            });
        }
        else {
            res.clearCookie("lastPostId");
            res.status(404).json({
                message: "No more community posts Found",
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({
          message: "Failed to fetch community posts, Error",
        });
    }
};

module.exports = {
    createPost,
    deletePost,
    getPost,
    likeUnlikePost,
    allPost,
    communityPost
};