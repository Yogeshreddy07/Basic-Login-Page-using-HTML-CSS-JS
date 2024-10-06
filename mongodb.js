const mongoose = require("mongoose");
mongoose.set('strictQuery',true);

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/home")
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((error) => {
        console.log("Failed to connect to MongoDB:", error);
    });

// Define schema for the collection
const homeSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    }
});

// Define the collection
const collection = mongoose.model("User", homeSchema);

module.exports = collection;
