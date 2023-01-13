// const { User } from "../db/models/UserModel.js";

const User  = require("../db/models/UserModel");


module.exports.loginUser = async(req,res,next)=>{


    const {email,password} = req.body;
    if(!email || !password){
        return next(new Error("Email and Password is required"))
    }
    try{
        const user = await User.findOne({email,}).select("+password")
        if(!user) return next(new Error("username and password didn't matched"));
        const isMatched = await user.comparePassword(password);
        if(!isMatched) return next(new Error("Username and password didn't matched"));
        const token = user.generateToken();
        res.cookie("auth_token",token);
        res.status(200).json({
            user,
        })
    }
    catch(err){
        console.log(err)
        return next(new Error(err.message))
    }
    
}

module.exports.registerUser = async(req,res,next)=>{
    const {name,email,password,cpassword} = req.body;
    if(!name || !email || !password || !cpassword)  return next(new Error("All fileds are required"));
    if(password !== cpassword)  return next(new Error("Password and Confirm password must be same"));
    try{
        const user = await User.findOne({email,});
        if(user) return next(new Error("User Already exists"));
        const newUser = await User.create({name,email,password});

       return res.status(201).json({
            user:newUser
        });

    }
    catch(err){
        return next(new Error(err.message))
    }
}


module.exports.logoutUser = async(req,res,next)=>{
    res.cookie("auth_token",null,{maxAge:Date.now()});
    res.status(200).json({
        msg:"Logged out Successfully"
    })
}

