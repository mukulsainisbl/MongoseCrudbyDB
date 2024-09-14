const express = require("express");
const todoRoute = express.Router();
const todoModel = require("../models/todo.model");

todoRoute.get("/",async (req, res) => {
 
 try {
    const allTodo = await todoModel.find()
    if(!allTodo){
        res.status(404).json({msg: "Todos not found"})
    }
    res.status(200).json({msg: "All todos fetched Succesfully" , allTodo})
 } catch (error) {
    res.status(500).json({msg: error.message})
 }
});

todoRoute.post("/", async (req, res) => {
  try {
    const addTodo = new todoModel(req.body);
    await addTodo.save();
    res.status(201).json({ msg: "Todo created succesfully", addTodo });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

todoRoute.put("/:id", async (req, res) => {
  let id = req.params.id;
  try {
    let updatedTodo = await todoModel.findByIdAndUpdate(id, req.body);

    if (!updatedTodo) {
     return res.status(404).json({ msg: "Todo not found" });
    }

    res.status(200).json({ msg: "Todo Update succesfully" ,updatedTodo });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

todoRoute.delete('/:id' ,async (req,res) => {
    let id =  req.params.id
    try {
        const deletedTodo = await todoModel.findByIdAndDelete(id)
    if(!deletedTodo){
        res.status(404).json({msg: "Todo not found"})
    }

    res.status(200).json({msg: "Todo delted Successfully"})
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
})

module.exports = todoRoute;
