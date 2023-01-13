import mongoose from "mongoose";

export default function ConnectDB(){
    mongoose.set('strictQuery',false);
    mongoose.connect(process.env.DB_URI).then(()=>{
        console.log("Database Connected")
    }).catch((err)=>{
        console.log(err)
    })
}