const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true, // Removes leading and trailing spaces
        minlength: 3,// Ensures the title is at least 3 characters long
        unique: true

    },
   
    status: {
        type: String,
        enum: ['pending', 'in-progress', 'completed'], // Restrict values to specific statuses
        default: 'pending' // Default status is 'pending'
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'], // Priority can be one of these values
        default: 'medium'
    },
   
    user: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the user
        ref: 'User' // Assumes you have a User model
    }
}, { timestamps: true,versionKey:false }); // Adds createdAt and updatedAt fields automatically

const todoModel = mongoose.model("todo", todoSchema);
module.exports = todoModel;
