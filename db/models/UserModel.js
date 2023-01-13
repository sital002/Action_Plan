import mongoose from "mongoose";
import bcrypt from 'bcrypt';

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



UserSchmea.methods.addTodo = function(newTaskId){
    return  this.todos.push(newTaskId)
}

UserSchmea.methods.comparePassword = async function(password){
   return await bcrypt.compare(password,this.password);
}
UserSchmea.methods.sayHi = function(){
    console.log(`Hi ${this.name}`);
}

UserSchmea.pre("save",async function(){
    const hashedPassword  = await bcrypt.hash(this.password,10);
    return this.password = hashedPassword;
})
export const User = mongoose.model("user",UserSchmea);