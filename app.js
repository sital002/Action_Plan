
const cookieParser = require("cookie-parser");
const express = require("express");
const userRoute = require("./routes/userRoutes");
const cors = require("cors");
const todoRoute = require("./routes/todoRoute");
const app = express();

//Middleware
app.use(cors())
app.use(cookieParser())
app.use(express.json())

// Api
app.use(userRoute);
app.use(todoRoute);

//Error
app.use((err,req,res,next)=>{
    res.status(400).json({
        msg:err.message
    })
})

module.exports = app;