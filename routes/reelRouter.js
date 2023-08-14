const express = require('express');
const reelRouter = express.Router();
const reelController = require('../controllers/reelController');
const authToken = require('../middleware/authMiddleware');
const reelUpload = require('../middleware/reelUpload');

reelRouter.post("/add", authToken , reelUpload.single('video') , reelController.createReel);
reelRouter.get("/:reelId/view", reelController.getReel);
reelRouter.put("/:reelId/like", authToken, reelController.likeUnlikeReel);
reelRouter.delete("/:reelId/delete", authToken, reelController.deleteReel);
reelRouter.get("/:userId/allreel",reelController.allReel);

module.exports = reelRouter;