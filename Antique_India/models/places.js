const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const placeSchema = new Schema({
  title: String,
  image: String,
  price: Number,
  description: String,
  location: String,
});

const places = mongoose.model("Place", placeSchema);
module.exports = places;
