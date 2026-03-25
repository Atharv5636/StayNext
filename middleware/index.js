const { listingSchema, reviewSchema } = require("../schema");
const ExpressError = require("../utils/ExpressError");

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
  next();
};

module.exports.isListingOwner = (req, res, next) => {
  next();
};

module.exports.isReviewAuthor = (req, res, next) => {
  next();
};

module.exports.setFlashLocals = (req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
};

module.exports.notFound = (req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
};

module.exports.errorHandler = (err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong!" } = err;
  res.status(statusCode).send(message);
};
