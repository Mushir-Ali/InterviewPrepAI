const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
};

// @desc     Register a user
// @route    POST /api/auth/register
// @access   public
const registerUser = async (req, res) => {
    try{
        console.log("req.body is",req.body);
        const {name,profileImageUrl,email,password} = req.body;

        // check if user exists
        const userExists = await User.findOne({email});
        if(userExists){
            res.status(400).json({message: "User already exists"});
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);


        // create new user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            profileImageUrl
        });

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profileImageUrl: user.profileImageUrl,
            token: generateToken(user._id),
        });
    }
    catch(error){
        res.status(500).json({message: "Server error",error: error.message});
    }
};


// @desc     Login a user
// @route    POST /api/auth/login
// @access   public
const loginUser = async (req, res) => {
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(500).json({message: "Invalid email or password"});
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(500).json({message: "Invalid email or password"});
        }
        else{
            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                profileImageUrl: user.profileImageUrl,
                token: generateToken(user._id),
            });
        }
    }
    catch(error){
        res.status(500).json({message: "Server error",error: error.message});
    }
};


// @desc     Get user profile
// @route    GET /api/auth/profile
// @access   private (requires jwt)
const getUserProfile = async (req, res) => {
    try{
        const user = await User.findById(req.user.id).select("-password");
        if(!user){
            return res.status(500).json({message: "User not found"});
        }
        res.json(user);
    }
    catch(error){
        res.status(500).json({message: "Server error",error: error.message});
    }
};

module.exports = {registerUser,loginUser,getUserProfile,};