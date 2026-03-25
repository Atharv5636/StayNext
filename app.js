// router used to handle all routes
//cookies and session for flash messages
//authentication is not implemented  - passport
//authorization is not implemented
//mvc model is followed
//cloudiary is not used for image hostingy 
//map integration is not done - mapbox
//user model is not created
/* The comment `//geocoding is not implemented - sdk` is indicating that geocoding functionality, which
is the process of converting addresses into geographic coordinates, is not implemented in the code
using a software development kit (SDK). Geocoding is typically used to enhance location-based
features in applications, such as mapping and location-based search. */
//geocoding is not implemented - sdk

const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Listing = require("./model/listing.js");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("./schema.js");
const Review = require("./model/review.js");
const session = require("express-session");
const flash = require("connect-flash");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);

//flash ans session configuration
const sessionOptions = {
  secret: "secretcode",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7, //1 weak time
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

app.use(session(sessionOptions));
app.use(flash());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  // res.locals.error = req.flash("error");
  next();
});
//main connection to db
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wonderlust");
}
main()
  .then(() => {
    console.log("connection db successful");
  })
  .catch((err) => console.log(err));

app.get(
  "/",
  wrapAsync(async (req, res) => {
    res.send("Welcome to Airbnb Clone");
  })
);

// middleware for validating listing data

const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    throw new ExpressError(400, error.details[0].message);
  } else next();
};

//middleware for validating review data
const validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body, { convert: true });
  if (error) {
    throw new ExpressError(400, error.details[0].message);
  } else next();
};

//display all listings
app.get(
  "/listings",
  wrapAsync(async (req, res) => {
    let allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  })
);

//add new listings
app.get(
  "/listings/new",
  wrapAsync(async (req, res) => {
    res.render("listings/new.ejs");
  })
);

//post new listing
app.post(
  "/listings",
  validateListing,
  wrapAsync(async (req, res) => {
    let { title, description, image, price, location, country } = req.body;
    let newListing = new Listing({
      title,
      description,
      image: { url: image },
      price,
      location,
      country,
    });
    await newListing.save();
    req.flash("success", "Successfully made a new listing");
    res.redirect("/listings");
  })
);

//edit listing route
app.get(
  "/listings/:id/edit",
  validateListing,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let myListings = await Listing.findById(id);

    res.render("listings/edit.ejs", { myListings });
  })
);

//add update listing route
app.put(
  "/listings/:id",
  validateListing,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let { title, description, image, price, location, country } = req.body;

    let updatedListing = await Listing.findByIdAndUpdate(id, {
      title,
      description,
      image: { url: image },
      price,
      location,
      country,
    });
    res.redirect(`/listings/${id}`);
  })
);

//show listing detsild route
app.get(
  "/listings/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let myListings = await Listing.findById(id).populate("reviews");
    res.render("listings/show.ejs", { myListings });
  })
);

//delete listing route
app.delete(
  "/listings/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
  })
);

//post route for review
app.post(
  "/listings/:id/reviews",
  validateReview,
  wrapAsync(async (req, res) => {
    let listing = await Listing.findById(req.params.id);

    // create review
    let newReview = new Review(req.body.review);
    await newReview.save();

    // push only the ObjectId reference
    listing.reviews.push(newReview._id);
    await listing.save();

    res.redirect(`/listings/${listing._id}`);
  })
);

//delete the review
app.delete(
  "/listings/:id/reviews/:reviewId",
  wrapAsync(async (req, res) => {
    let { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/listings/${id}`);
  })
);

app.listen(8080, () => {
  console.log("port is listeninb");
});
//if a route is not found
app.all(/.*/, (req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});
// general error handler
app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong!" } = err;
  res.status(statusCode).send(message);
});
