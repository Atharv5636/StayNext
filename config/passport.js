const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
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

function configurePassport() {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await User.findOne({ username: username.toLowerCase() });

        if (!user || !user.passwordHash) {
          return done(null, false, { message: "Invalid username or password." });
        }

        const isValidPassword = await bcrypt.compare(password, user.passwordHash);

        if (!isValidPassword) {
          return done(null, false, { message: "Invalid username or password." });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID || "GOOGLE_CLIENT_ID",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || "GOOGLE_CLIENT_SECRET",
        callbackURL:
          process.env.GOOGLE_CALLBACK_URL ||
          "http://localhost:8080/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile.emails?.[0]?.value;

          if (!email) {
            return done(new Error("Google account email is required."), false);
          }

          const name = profile.displayName || "Google User";
          const avatar = profile.photos?.[0]?.value || "";
          let user = await User.findOne({ googleId: profile.id });

          if (!user) {
            user = await User.findOne({ email });
          }

          if (!user) {
            const username = await generateUniqueUsername(email.split("@")[0]);
            user = await User.create({
              username,
              googleId: profile.id,
              email,
              name,
              avatar,
            });
          } else {
            user.googleId = profile.id;
            user.email = email;
            user.name = name;
            user.avatar = avatar;
            if (!user.username) {
              user.username = await generateUniqueUsername(email.split("@")[0]);
            }
            await user.save();
          }

          done(null, user);
        } catch (err) {
          done(err, false);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err, false);
    }
  });
}

module.exports = configurePassport;
