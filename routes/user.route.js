const express = require("express");
const userModel = require("../models/user.models");
const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
  try {
    const allUser = await userModel.find()
    if(!allUser){
        res.status(404).json({msg: "Users not found"})
    }
    res.status(200).json({mag: "All user Fetched" , allUser})
  } catch (error) {
    res.status(404).json({msg: error.message})
  }
});

userRouter.post("/", async (req, res) => {
  try {
    const newUser = new userModel(req.body);
    await newUser.save();
    res.status(201).json({ msg: "User created succesfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

userRouter.put("/:id", async (req, res) => {
  let id = req.params.id;
  try {
    const updateUser = await userModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updateUser) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.status(200).json({ msg: "Update Succesfully", updateUser });
  } catch (error) {
    res.status(404).json({ msg: res.message });
  }
});

userRouter.delete("/:id", async (req, res) => {
  let id = req.params.id;

  try {
    const deletedUser = await userModel.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.status(200).json({ msg: "Deleted Succesfully" });
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
});

module.exports = userRouter;
