const express = require("express");
const { addTodo, deleteTodo, getAllTodo } = require("../controllers/todoController");
const auth = require("../middleware/auth");


const todoRoute = express.Router();

todoRoute.post("/todo/new",auth,addTodo)
todoRoute.get("/todo/all",auth,getAllTodo)
todoRoute.delete("/todo/delete/:id",auth,deleteTodo)

module.exports = todoRoute;