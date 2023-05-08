const express = require("express");
const { addTodo, deleteTodo, getAllTodo, updateTodoStatus } = require("../controllers/todoController");
const auth = require("../middleware/auth");


const todoRoute = express.Router();

todoRoute.post("/todo/new",auth,addTodo);
todoRoute.patch("/todo/update/:id",auth,updateTodoStatus)
todoRoute.delete("/todo/delete/:id",auth,deleteTodo);
todoRoute.get("/todo/all",auth,getAllTodo);

module.exports = todoRoute;