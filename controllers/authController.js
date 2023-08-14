const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserModel = require('../models/User');

// Existing User Login
const signin = async (req,res) => {
    const {email,password} = req.body;
    try {
        const existingUser = await UserModel.findOne({email: email});
        if (!existingUser) {
            return res.status(404).json({
                message: "User Not Found"
            });
        }
        const matchPassword = await bcrypt.compare(password,existingUser.password);
        if (!matchPassword) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        const payLoad = {
            email: existingUser.email,
            userId: existingUser._id
        }
        const token = jwt.sign(payLoad,process.env.JWT_SECRET_KEY);

        res.status(200).json({
            message: "User has been logged In",
            user: existingUser,
            token: token
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server Error"
        });
    }
};

// New user signin
const signup = async (req,res) => {
    const {email,password} = req.body;
    try {

        // Checking if user exists
        const existingUser = await UserModel.findOne({email: email});
        if (existingUser) {
            return res.status(400).json({message: "User Exists"});
        }

        // Password Encryption
        const saltRounds = await bcrypt.genSalt(12 /*Salt Rounds*/);
        const encryptPassword = await bcrypt.hash(password,saltRounds);
        req.body.password = encryptPassword;

        //create new Account
        const createUser = await new UserModel(req.body);
        await createUser.save();
        // Token Generation
        const payLoad = {
            email: createUser.email,
            userId: createUser._id
        }
        const token = jwt.sign(payLoad,process.env.JWT_SECRET_KEY);
        
        res.status(201).json({
            message: "User has been Created",
            user: createUser,
            token: token
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server Error"
        });
    }
};

module.exports = {
    signin,
    signup
};