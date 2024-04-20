const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const generateTokenAndSetCookie = require('../utils/generateToken');

const signup = async (req,res)=>{
    try{
        const {fullName, username, password, confirmPassword, gender } = req.body;
        if(password !== confirmPassword){
            return res.status(400).json({error:"Passwords do not match"});
        }

        const user = await User.findOne({username});
        if(user){
            return res.status(400).json({error:"Username already exists"});
        }

        //HASH PASSWORD
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);


        const profilePic = `https://avatar.iran.liara.run/username?username=${fullName}`

        const newUser = new User({
          fullName,
          username,
          password: hashedPassword,
          gender,
          profilePic,
        });
        if(newUser) {
            //Generate JWT Token
            generateTokenAndSetCookie(newUser._id,res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePic: newUser.profilePic,
                message: "User Created Successfully!"
            });
        }
        else{
            res.status(400).json({error:"Invalid User Data"});
        }
    }
    catch(error){       
        console.log(error.message);
        res.status(500).json({error:"Server Error"});
    }   
}


 const login = async (req,res)=>{
    try{
        const {username, password} = req.body;
        const user = await User.findOne({username});
        if(!username)
            return res.status(400).json({error:"Please enter a Username"});
        if(!password)
            return res.status(400).json({error:"Please enter a Password"});

        const isPasswordCorrect = await bcrypt.compare(password,user?.password || " ");

        if(!user || !isPasswordCorrect) 
            return res.status(400).json({error:"Invalid Credentials"});

        generateTokenAndSetCookie(user._id,res); 
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic,
            message: "User Login Successfully!"
        });

    }
    catch(error){
        console.log("Error in Login Controller",error.message);
        res.status(500).json({error:"Server Error"});
    }
 }
const logout = (req,res)=>{
    //res.send("Logout Route")
    try{
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:"User Logged Out!"});
    }
    catch(error){
        console.log("Error in Logout Controller",error.message);
        res.status(500).json({error:"Server Error"});
    }
}

module.exports = {signup,login,logout};