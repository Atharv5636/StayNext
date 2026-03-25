const Listing = require("../models/listing");
const ExpressError = require("../utils/ExpressError");

function buildListingData(body) {
  const { title, description, image, price, location, country } = body;

  return {
    title,
    description,
    image: { url: image },
    price,
    location,
    country,
  };
}

async function findListingOrThrow(id) {
  const listing = await Listing.findById(id);

  if (!listing) {
    throw new ExpressError(404, "Listing not found");
  }

  return listing;
}

module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewForm = async (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.createListing = async (req, res) => {
  const newListing = new Listing(buildListingData(req.body));

  await newListing.save();
  req.flash("success", "Successfully made a new listing");
  res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
  const myListings = await findListingOrThrow(req.params.id);
  res.render("listings/edit.ejs", { myListings });
};

module.exports.showListing = async (req, res) => {
  const myListings = await Listing.findById(req.params.id).populate("reviews");

  if (!myListings) {
    throw new ExpressError(404, "Listing not found");
  }

  res.render("listings/show.ejs", { myListings });
};

module.exports.updateListing = async (req, res) => {
  const { id } = req.params;
  const updatedListing = await Listing.findByIdAndUpdate(id, buildListingData(req.body));

  if (!updatedListing) {
    throw new ExpressError(404, "Listing not found");
  }

  res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async (req, res) => {
  const deletedListing = await Listing.findByIdAndDelete(req.params.id);

  if (!deletedListing) {
    throw new ExpressError(404, "Listing not found");
  }

  res.redirect("/listings");
};
