const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const flash = require("connect-flash");

const connectDB = require("./config/db");
const sessionConfig = require("./config/session");
const listingRoutes = require("./routes/listings");
const reviewRoutes = require("./routes/reviews");
const { setFlashLocals, notFound, errorHandler } = require("./middleware");

const app = express();

connectDB().catch((err) => console.log(err));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.engine("ejs", ejsMate);

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(session(sessionConfig));
app.use(flash());
app.use(setFlashLocals);

app.get("/", (req, res) => {
  res.send("Welcome to Airbnb Clone");
});

app.use("/listings", listingRoutes);
app.use("/listings/:id/reviews", reviewRoutes);

app.all(/.*/, notFound);
app.use(errorHandler);

app.listen(8080, () => {
  console.log("port is listeninb");
});
