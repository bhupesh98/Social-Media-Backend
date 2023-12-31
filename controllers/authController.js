const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserModel = require('../models/User');

// Existing User Login
const signin = async (req,res) => {
    try {
        const existingUser = await UserModel.findOne({email: req.body.email});
        if (!existingUser) {
            return res.status(404).json({
                message: "User Not Found"
            });
        }
        const matchPassword = await bcrypt.compare(req.body.password,existingUser.password);
        if (!matchPassword) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        const payLoad = {
            userId: existingUser._id
        }
        const token = jwt.sign(payLoad,process.env.JWT_SECRET_KEY);
        res.cookie("token",token,{
            httpOnly: true
        });
        const {password,__v,...data} = existingUser._doc;
        res.status(200).json({
            message: "User has been logged In",
            user: data
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
    try {

        // Checking if user exists
        const existingUser = await UserModel.findOne({
            $or :[{email: req.body.email},
                {username: req.body.username }]
        });
        if (existingUser) {
            return res.status(400).json({message: "Username or Email Exists"});
        }

        // Password Encryption
        const saltRounds = await bcrypt.genSalt(12 /*Salt Rounds*/);
        const encryptPassword = await bcrypt.hash(req.body.password,saltRounds);
        req.body.password = encryptPassword;

        //create new Account
        const createUser = await new UserModel(req.body);
        await createUser.save();
        // Token Generation
        const payLoad = {
            userId: createUser._id
        }
        const token = jwt.sign(payLoad,process.env.JWT_SECRET_KEY);
        res.cookie("token",token,{
            httpOnly: true
        });
        const {password,__v,...data} = createUser._doc;
        res.status(201).json({
            message: "User has been Created",
            user: data
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server Error"
        });
    }
};

const logout = async (req,res) => {
    res.clearCookie("token");
    res.status(200).json({
        message: "You have been logged out"
    });
}

module.exports = {
    signin,
    signup,
    logout
};
