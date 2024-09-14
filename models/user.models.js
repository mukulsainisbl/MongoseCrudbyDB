const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true // Removes whitespace
  },
  age: {
    type: Number,
    min: 0 // Ensures age is non-negative
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure unique email addresses
    lowercase: true // Convert email to lowercase
  },
  isMarried: {
    type: Boolean,
    default: false // Default value if not provided
  }
}, { timestamps: true ,versionKey: false }); // Adds createdAt and updatedAt fields

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
