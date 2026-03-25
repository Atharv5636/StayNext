const { listingSchema, reviewSchema } = require("../schema");
const ExpressError = require("../utils/ExpressError");
const Listing = require("../models/listing");
const Review = require("../models/review");

function validate(schema, source = "body", options = {}) {
  return (req, res, next) => {
    const { error } = schema.validate(req[source], options);

    if (error) {
      throw new ExpressError(400, error.details[0].message);
    }

    next();
  };
}

module.exports.validateListing = validate(listingSchema);
module.exports.validateReview = validate(reviewSchema, "body", { convert: true });

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    req.flash("error", "You must be logged in to continue.");
    return res.redirect("/auth/login");
  }

  next();
};

module.exports.isListingOwner = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    throw new ExpressError(404, "Listing not found");
  }

  if (!listing.owner || !listing.owner.equals(req.user._id)) {
    req.flash("error", "You do not have permission to modify this listing.");
    return res.redirect(`/listings/${req.params.id}`);
  }

  next();
};

module.exports.isReviewAuthor = async (req, res, next) => {
  const review = await Review.findById(req.params.reviewId);

  if (!review) {
    throw new ExpressError(404, "Review not found");
  }

  if (!review.author || !review.author.equals(req.user._id)) {
    req.flash("error", "You do not have permission to modify this review.");
    return res.redirect(`/listings/${req.params.id}`);
  }

  next();
};

module.exports.setFlashLocals = (req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.user || null;
  next();
};

module.exports.notFound = (req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
};

module.exports.errorHandler = (err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong!" } = err;
  res.status(statusCode).send(message);
};
