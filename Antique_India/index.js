const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");
const mongoose = require("mongoose");
const Joi = require("joi");
const { placeSchema } = require("./schemas");
const catchAsync = require("./utils/CatchAsync");
const expressError = require("./utils/ExpressError");
const methodOverride = require("method-override");
const places = require("./models/places");

mongoose.connect("mongodb://localhost:27017/Antique_India", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
// app.engine(", require("ejs").renderFile);
app.use(methodOverride("_method"));

const validatePlace = (req, res, next) => {
  const { error } = placeSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new expressError(msg, 400);
  } else {
    next();
  }
};
app.get("/", (req, res) => {
  res.render("home");
});

app.get("/places", async (req, res) => {
  const allPlaces = await places.find({});
  res.render("places/index", { allPlaces });
  // console.log(allPlaces);
});

app.get("/places/new", (req, res) => {
  res.render("places/new");
});

app.post(
  "/places",
  validatePlace,
  catchAsync(async (req, res) => {
    // if (!req.body.place) throw new expressError("Invalid Place Details", 400);

    const place = new places(req.body.place);
    await place.save();
    res.redirect(`/places/${place._id}`);
  })
);

app.get(
  "/places/:id",
  catchAsync(async (req, res) => {
    const id = req.params.id;
    // console.log(id);
    const place = await places.findById(id);
    // console.log(place);
    res.render("places/show", { place });
  })
);

app.get(
  "/places/:id/edit",
  catchAsync(async (req, res) => {
    const place = await places.findById(req.params.id);
    // console.log(place);
    res.render("places/edit", { place });
  })
);

app.put(
  "/places/:id",
  validatePlace,
  catchAsync(async (req, res) => {
    const id = req.params.id;
    const place = await places.findByIdAndUpdate(id, { ...req.body.place });
    // console.log(place._id);
    res.status(302).redirect(`/places/${place._id}`);
  })
);

app.delete(
  "/places/:id",
  catchAsync(async (req, res) => {
    await places.findByIdAndDelete(req.params.id);
    res.redirect("/places");
  })
);
app.all("*", (req, res, next) => {
  // res.send("eRRor 404");
  next(new expressError("Pagge not found", 404));
});
app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Something Went Wrong";
  res.status(statusCode).render("error", { err });
  // res.send("Something went wrong hit the error handler");
});

app.listen(3000, () => {
  console.log(`Listening on port http://localhost:3000`);
});
