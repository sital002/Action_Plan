const dotenv = require("dotenv");
const app =require("./app")
const  ConnectDB  = require ('./db/ConnectDB');


if(process.env.NODE_ENV !== "PRODUCTION"){
    dotenv.config({path:"./config/config.env"});
}
ConnectDB();
const PORT = process.env.PORT  || 8000






app.listen(PORT,()=>{
    console.log("Server is running at PORT",PORT)
})