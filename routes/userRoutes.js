
const express = require("express")
const { loginUser, registerUser, logoutUser }  = require('../controllers/userController.js');
const auth = require("../middleware/auth.js");


const userRoute = express.Router();


userRoute.get("/me",auth,(req,res)=>{
    res.status(200).json({
        user:req.user
    })
})
userRoute.post("/login",loginUser);
userRoute.get("/logout",auth,logoutUser)
userRoute.post("/register",registerUser);




module.exports =  userRoute
