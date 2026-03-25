const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");
const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    url: {
      type: String,
      set: (v) =>
        v === "" || v == null
          ? "https://media.istockphoto.com/id/2186884332/photo/coconut-palm-trees-and-beautiful-turquoise-sea-on-tropical-paradise-beach.jpg?s=1024x1024&w=is&k=20&c=yyQK2y3Vucm_eh3xuNhDSi8QwKKwZFgwFALlvm6FFQE="
          : v,
    },
  },
  price: Number,
  location: String,
  country: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

const Listing = mongoose.model("listing", listingSchema);
module.exports = Listing;
