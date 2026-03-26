require("dotenv").config();

const mongoose = require("mongoose");
const Listing = require("../models/listing");
const User = require("../models/user");
const createSampleListings = require("./data");

const mongoUri = process.env.DB_URL || "mongodb://127.0.0.1:27017/wonderlust";
const fallbackOwnerId = new mongoose.Types.ObjectId("64c13ab08edf48a008793cac");

async function getSeedOwnerId() {
  const existingUser = await User.findOne({});
  return existingUser ? existingUser._id : fallbackOwnerId;
}

async function seedDatabase() {
  await mongoose.connect(mongoUri);

  try {
    const ownerId = await getSeedOwnerId();
    const sampleListings = createSampleListings(ownerId);

    await Listing.deleteMany({});
    await Listing.insertMany(sampleListings);

    console.log("Database seeded");
  } finally {
    await mongoose.connection.close();
  }
}

seedDatabase().catch((err) => {
  console.error(err);
  process.exit(1);
});
