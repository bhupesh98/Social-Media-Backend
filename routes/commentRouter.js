const express = require('express');
const commentRouter = express.Router();
const commentController = require('../controllers/commentController');
const authToken = require('../middleware/authMiddleware');

commentRouter.post('/:postId/add',authToken,commentController.addComment);
commentRouter.get('/:postId/view',commentController.viewComments);

module.exports = commentRouter;