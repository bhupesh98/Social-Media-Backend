const reelModel = require('../models/Reel');
const cloudinary = require('../config/cloudinaryConfig');
const getDataURI = require('../utils/dataURIparser');

const createReel = async (req,res) => {
    try {
        // Adding user in reel's user
        req.body.user = req.userId;
        const dataURI = getDataURI(req.file);

        const reelUpload = await cloudinary.uploader.upload((await dataURI).content,{
            resource_type: "video",
            folder: "reels",
            format: "webm",
            allowed_formats: ["mp4","webm","mkv"],
            public_id: `${Date.now()}-reel-${req.userId}`,
            overwrite: false
        });
        req.body.reelVideo = {
            URL: reelUpload.secure_url,
            publicId: reelUpload.public_id
        };
        const newReel = await new reelModel(req.body);
        await newReel.save();
        const {__v,...otherData} = newReel._doc;
        res.status(200).json({
            message: "Reel has been created",
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
            await cloudinary.uploader.destroy(reelDelete.reelVideo.publicId,{
                resource_type: "video"
            });
            await reelModel.findByIdAndDelete(req.params.reelId);
    
            res.status(200).json({
                message: "Reel has been deleted",
            });
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
            const {__v,...data} = viewReel._doc;
            res.status(200).json(data);
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