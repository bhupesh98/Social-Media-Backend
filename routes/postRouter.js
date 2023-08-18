const express = require('express');
const postRouter = express.Router();
const postController = require('../controllers/postController');
const authToken = require('../middleware/authMiddleware');
const postUpload = require('../middleware/multerMiddleware');

postRouter.post("/add", authToken , postUpload.single('image') , postController.createPost);
postRouter.get("/:postId/view", postController.getPost);
postRouter.put("/:postId/like", authToken, postController.likeUnlikePost);
postRouter.delete("/:postId/delete", authToken, postController.deletePost);
postRouter.get("/:userId/allPost",postController.allPost);
postRouter.get("/:category",postController.communityPost);

module.exports = postRouter;