
const mongoose = require("mongoose")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const UserSchmea = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is required"]
    },
    email:{
        type:String,
        required:[true,"Email is required"]
    },
    password:{
        type:String,
        required:[true,"Password is required"],
        select:false
    },
    todos:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"todo",
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now()
    }
})




UserSchmea.methods.comparePassword = async function(password){
   return await bcrypt.compare(password,this.password);
}

UserSchmea.methods.generateToken =  function (){
   return jwt.sign({token:this._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRE});
}

UserSchmea.pre("save",async function(next){
    if(!this.isModified("password")){
        return next()
    }
        const hashedPassword  = await bcrypt.hash(this.password,10);
        return this.password = hashedPassword;
})
const User= mongoose.model("user",UserSchmea);
 module.exports  = User