const bcrypt = require("bcrypt");
const User = require("../models/user");

async function generateUniqueUsername(baseUsername) {
  let username = (baseUsername || "user").toLowerCase().replace(/[^a-z0-9_]/g, "");

  if (!username) {
    username = "user";
  }

  let candidate = username;
  let counter = 1;

  while (await User.findOne({ username: candidate })) {
    candidate = `${username}${counter}`;
    counter += 1;
  }

  return candidate;
}

module.exports.renderSignup = (req, res) => {
  res.render("auth/signup.ejs");
};

module.exports.signup = async (req, res, next) => {
  const { username, email, name, password } = req.body;

  const existingUser = await User.findOne({
    $or: [{ email: email.toLowerCase() }, { username: username.toLowerCase() }],
  });

  if (existingUser) {
    req.flash("error", "User with this email or username already exists.");
    return res.redirect("/auth/signup");
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await User.create({
    username: username.toLowerCase(),
    email: email.toLowerCase(),
    name,
    passwordHash,
  });

  req.login(user, (err) => {
    if (err) {
      return next(err);
    }

    req.flash("success", `Welcome, ${user.name}`);
    res.redirect("/listings");
  });
};

module.exports.renderLogin = (req, res) => {
  res.render("auth/login.ejs");
};

module.exports.login = (req, res) => {
  req.flash("success", `Welcome back, ${req.user.name}`);
  res.redirect("/listings");
};

module.exports.googleCallback = async (req, res) => {
  if (!req.user.username) {
    req.user.username = await generateUniqueUsername(req.user.email.split("@")[0]);
    await req.user.save();
  }

  req.flash("success", `Welcome, ${req.user.name}`);
  res.redirect("/listings");
};

module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }

    req.flash("success", "Logged out successfully");
    res.redirect("/listings");
  });
};
