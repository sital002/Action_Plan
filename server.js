import app from './app.js'
import dotenv from 'dotenv';
import ConnectDB from './db/ConnectDB.js';


if(process.env.NODE_ENV !== "PRODUCTION"){
    dotenv.config({path:"./config/config.env"});
}
ConnectDB();
const PORT = process.env.PORT  || 8000






app.listen(PORT,()=>{
    console.log("Server is running at PORT",PORT)
})