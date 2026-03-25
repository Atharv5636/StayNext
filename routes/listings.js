const express = require("express");

const router = express.Router();
const listingsController = require("../controllers/listings");
const {
  validateListing,
  isLoggedIn,
  isListingOwner,
} = require("../middleware");
const wrapAsync = require("../utils/wrapAsync");

router
  .route("/")
  .get(wrapAsync(listingsController.index))
  .post(isLoggedIn, validateListing, wrapAsync(listingsController.createListing));

router.get("/new", isLoggedIn, wrapAsync(listingsController.renderNewForm));

router
  .route("/:id")
  .get(wrapAsync(listingsController.showListing))
  .put(
    isLoggedIn,
    isListingOwner,
    validateListing,
    wrapAsync(listingsController.updateListing)
  )
  .delete(isLoggedIn, isListingOwner, wrapAsync(listingsController.deleteListing));

router.get(
  "/:id/edit",
  isLoggedIn,
  isListingOwner,
  wrapAsync(listingsController.renderEditForm)
);

module.exports = router;
