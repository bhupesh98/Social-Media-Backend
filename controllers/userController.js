const UserModel = require('../models/User');
const bcrypt = require('bcrypt');
const cloudinary = require('../config/cloudinaryConfig');
const getDataURI = require('../utils/dataURIparser');

const profileUpdate = async (req,res) => {
    try {
        // If password update is requested
        var yourselfUser = await UserModel.findById(req.userId);
        if (!yourselfUser) {
            res.status(400).json({
                message: "Can't update, Profile not found"
            });
        }
        if (req.body.password) {
            const salt = await bcrypt.genSalt(12);
            req.body.password = await bcrypt.hash(req.body.password,salt);
        }

        if (req.file) {
            const dataURI = getDataURI(req.file);
            const profileUplaod = await cloudinary.uploader.upload((await dataURI).content,{
                resource_type: "image",
                folder: "profilePhoto",
                allowed_formats: ["jpg","png","jpeg"],
                format: "png",
                public_id: `profilePhoto-${req.userId}`,
                overwrite: true
            });
            req.body.profilePicture = {
                URL:  profileUplaod.secure_url,
                publicId: profileUplaod.public_id
            };
        }
        const {followers,followings,...updateData} = req.body;
        yourselfUser = await UserModel.findByIdAndUpdate(req.userId,{
            $set: updateData
        }).then(res.status(200).json({
            message: "Profile updated successfully",
        }));
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to update user profile, Error"
        });
    }
};

const viewProfile = async (req,res) => {
    try {
        const username = req.params.username;
        const user = await UserModel.findOne({
            username: username 
        });
        if (user) {
            const { password,__v,...otherInfo } = user._doc;
            res.status(200).json({
              status: "success",
              user: otherInfo,
            });
        }
        else {
            res.status(404).json({
                message: "User not found"
            });
        }
    } catch (error) {
        res.status(500).json({
          message: "Can't view profile, Error"
        });
    }
}

const followUser = async (req,res) => {
    try {
        const yourselfUser = await UserModel.findById(req.userId);

        if (yourselfUser.username === req.params.username) {
            res.status(400).json({
                message: "Can't follow yourself"
            });
        }
        const userToFollow = await UserModel.findOne({
            username: req.params.username
        });
        if (userToFollow) {
            if (userToFollow.followers.includes(yourselfUser._id)) {
                res.status(400).json({
                    message: "You already follow this user"
                })
            }
            else {
                await yourselfUser.updateOne({
                    $push: {
                        followings: userToFollow._id 
                    }
                });
                await userToFollow.updateOne({
                    $push: {
                        followers: req.userId
                    }
                });
                  res.status(200).send({
                    message: "User has been followed"
                });
            }
        }
        else {
            res.status(404).json({
                message: "User not Found"
            });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to follow the user, Error"
        });
    }
};


const unfollowUser = async (req,res) => {
    try {
        const yourselfUser = await UserModel.findById(req.userId);

        if (yourselfUser.username === req.params.username) {
            res.status(400).json({
                message: "Can't unfollow yourself"
            });
        }
        const userToUnfollow = await UserModel.findOne({
            username: req.params.username
        });

        if (userToUnfollow) {
            if (userToUnfollow.followers.includes(yourselfUser._id)) {
                await yourselfUser.updateOne({
                    $pull: {
                        followings: userToUnfollow._id 
                    }
                });
                await userToUnfollow.updateOne({
                    $pull: {
                        followers: req.userId
                    }
                });
                res.status(200).send({
                    message: "User has been unfollowed"
                });
            }
            else {
                res.status(400).json({
                    message: "You already unfollow this user"
                });
            }
        }
        else {
            res.status(404).json({
                message: "User not Found"
            });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to unfollow the user, Error"
        });
    }
};

module.exports = {
    profileUpdate,
    viewProfile,
    followUser,
    unfollowUser
};