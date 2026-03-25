const express = require("express");
const passport = require("passport");

const router = express.Router();
const authController = require("../controllers/auth");
const wrapAsync = require("../utils/wrapAsync");

router.get("/signup", authController.renderSignup);
router.post("/signup", wrapAsync(authController.signup));

router.get("/login", authController.renderLogin);
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/auth/login",
    failureFlash: true,
  }),
  authController.login
);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/login",
    failureFlash: true,
  }),
  wrapAsync(authController.googleCallback)
);

router.get("/logout", authController.logout);

module.exports = router;
