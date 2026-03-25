const mongoose = require("mongoose");
const Listing = require("../model/listing.js");
const initData = require("./data.js");

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wonderlust");
  console.log("Database connection established");
}
main()
  .then(() => {
    console.log("connection db successful");
  })
  .catch((err) => console.log(err));

const initDB = async () => {
  await Listing.deleteMany({});
  await Listing.insertMany(initData);
  console.log("Database initialized with sample data");
};
initDB();
