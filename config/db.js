const mongoose = require("mongoose");

async function connectDB() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wonderlust");
  console.log("connection db successful");
}

module.exports = connectDB;
