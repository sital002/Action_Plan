const jwt = require("jsonwebtoken");
const User = require("../db/models/UserModel");

const auth = async(req,res,next)=>{
    const {auth_token} = req.cookies
    if(!auth_token) return next(new Error("Token is required"))
    // console.log(auth_token);
    try{
        const {token} = jwt.verify(auth_token,process.env.JWT_SECRET);
        const user = await User.findById(token);
        req.user = user;
        return  next();
    }
    catch(err){
        return next(new Error(err.message))
    }
}

module.exports = auth