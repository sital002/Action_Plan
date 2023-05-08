
const cookieParser = require("cookie-parser");
const express = require("express");
const userRoute = require("./routes/userRoutes");
const cors = require("cors");
const todoRoute = require("./routes/todoRoute");
const app = express();
const path = require('path')


const FILE_PATH = path.join(__dirname,"build");


//Middleware
app.use(express.static(FILE_PATH))
app.use(cors())
app.use(cookieParser())
app.use(express.json())

// Api
app.use("/api/",userRoute);
app.use("/api/",todoRoute);



app.get("/*",(req,res)=>{
    res.sendFile(path.join(FILE_PATH,"index.html"))
})



//Error
app.use((err,req,res,next)=>{
    res.status(400).json({
        msg:err.message
    })
})

module.exports = app;