const Todo = require("../db/models/TodoModel");
const User = require("../db/models/UserModel");



module.exports.addTodo = async(req,res,next)=>{
    const {todo} = req.body;
    if(!todo) return next(new Error("Todo is required"));
    try{
        const newTodo = await Todo.create({userId:req.user._id,task:todo});
        res.status(201).json({
            todo:newTodo
        })
    }
    catch(err){
        return next(new Error(err.message))
    }
}

module.exports.deleteTodo = async(req,res,next)=>{
    try{
    const {id} = req.params;
    const todo = await Todo.findByIdAndDelete(id);
        // if(todo.userId !==req.user._id) return next(new Error("Not Authorized"));
        res.status(200).json({
            todo,
        })
    }
    catch(err){
        return next(new Error(err.message))
    }
}

module.exports.getAllTodo = async(req,res,next)=>{
    try{
const todos = await Todo.find({userId:req.user._id});
res.status(200).json({
    todos,
})

    }
    catch(err){
        return next(new Error(err.message))
    }
}

module.exports.updateTodoStatus = async(req,res,next)=>{
    try{
       const {id} =  req.params;
       const todo = await Todo.findById(id);
       todo.status = todo.status === "pending" ? "completed" : "pending";
       await todo.save();
       res.status(200).json({
        todo,
        msg:"Task updated"
       });
    }
    catch(err){
        return next(new Error(err.message))
    }
}