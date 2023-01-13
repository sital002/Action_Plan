const mongoose = require("mongoose")

const TodoModel = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    task:{
        type:String,
        required:[true,"Task is required"]
    },
    status:{
        type:String,
        default:"pending"
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
});


const Todo = mongoose.model("todo",TodoModel);
module.exports  = Todo; 