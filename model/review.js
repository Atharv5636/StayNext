const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  comments: {
    type: String,
    required: true, // make it mandatory
    trim: true, // removes extra spaces
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
