const reelModel = require('../models/Reel');
const fs = require('fs');

const createReel = async (req,res) => {
    try {
        // Adding user in reel's user
        req.body.user = req.userId;
        req.body.reelURL = req.reelURL;
        const newReel = await new reelModel(req.body);
        const {_id,__v,...otherData} = newReel._doc;
        await newReel.save();
        res.status(200).json({
            message: "Reel has been created",
            reelId: newReel._id,
            data: otherData
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to add Reel, Error"
        });
    }
};

const deleteReel = async (req,res) => {
    // using reelId to get reel to delete it
    try {
        const reelDelete = await reelModel.findById(req.params.reelId);
        if (reelDelete) {
            if (req.userId === reelDelete.user.toString()) {

                const filename = reelDelete.reelURL.split('/').pop();
                fs.unlink(`./uploads/reels/${filename}`,(err)=> {});
                await reelModel.findByIdAndDelete(req.params.reelId);
                
                res.status(200).json({
                    message: "Reel has been deleted",
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
                message: "reel doesn't exists"
            })
        }
    } catch(error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to delete reel, Error"
        });
    }
};

const getReel = async (req,res) => {
    try {
        const viewReel = await reelModel.findById(req.params.reelId);
        if (viewReel) {
            res.status(200).json(viewReel);
        }
        else {
            res.status(404).json({
                message: "reel not Found"
            });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to get reel, Error"
        });
    }
};
const likeUnlikeReel = async (req,res) => {
    try {
        const reel = await reelModel.findById(req.params.reelId);
        if (!reel.likes.includes(req.userId)) {
            await reel.updateOne({ 
                $push: { likes: req.userId } });
            res.status(200).json({
                message: "reel has been liked",
                numberOfLikes: reel.likes.length + 1
            });
        } else {
            await reelModel.updateOne({
                $pull: { likes: req.userId } });
            res.status(200).json({
                message: "reel has been unliked",
                numberOfLikes: reel.likes.length - 1
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: "Failed to interact with likes, Error",
        });
    }
};

const allReel = async (req,res) => {
    try {
        const reels = await reelModel.find({
            user: req.params.userId
        })
        if (reels.length) {
            res.status(200).json({
                reels: reels
            });
        }
        else {
            res.status(404).json({
                message: "No reels Found",
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({
          message: "Failed to fetch all reels, Error",
        });
    }
}

module.exports = {
    createReel,
    deleteReel,
    getReel,
    likeUnlikeReel,
    allReel
};