const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController');
const authToken = require('../middleware/authMiddleware');
const fileUpload = require('../middleware/profileUpload');


userRouter.put("/profile/update",authToken,fileUpload.single('image'),userController.profileUpdate);
userRouter.get("/profile/:username/view",userController.viewProfile);
userRouter.put("/:username/follow",authToken,userController.followUser);
userRouter.put("/:username/unfollow",authToken,userController.unfollowUser);

module.exports = userRouter;