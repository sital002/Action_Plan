import mongoose from "mongoose";

const TodoModel = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    task:{
        type:String,
        required:[true,"Task is required"]
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
});


export const Todo = mongoose.model("todo",TodoModel);