const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/authController')

authRouter.post('/signin', authController.signin);
authRouter.post('/signup', authController.signup);


module.exports = authRouter;