const express = require("express");

const router = express.Router({ mergeParams: true });
const reviewsController = require("../controllers/reviews");
const {
  validateReview,
  isLoggedIn,
  isReviewAuthor,
} = require("../middleware");
const wrapAsync = require("../utils/wrapAsync");

router.post("/", isLoggedIn, validateReview, wrapAsync(reviewsController.createReview));
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(reviewsController.deleteReview)
);

module.exports = router;
