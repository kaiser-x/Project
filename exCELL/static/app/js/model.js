const mongoose = require("mongoose");
// mongoose.connect(
//   "mongodb+srv://excell:excell@cluster0.kkn3b.mongodb.net/tarun?retryWrites=true&w=majority",
//   { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
// );
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { response } = require("express");
const registerSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  height: Number,
  bldgrp: String,
  weight: Number,
  mtg: String,
  ftso: String,
  fmtg: String,
  msto: String,
  mmtg: String,
  street: String,
  city: String,
  state: String,
  zip: Number,
  whatsappy: String,
  whatsapps: String,
  mno: Number,
  amno: Number,
  em: String,
  aem: String,
  c1fname: String,
  c1lname: String,
  r1el: String,
  m1rel: Number,
  c2fname: String,
  c2lname: String,
  r2el: String,
  m2rel: Number,
});
const signupSchema = new mongoose.Schema({
  semail: {
    type: String,
    unique: true,
    required: true,
  },
  spassword: {
    type: String,
    required: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});
signupSchema.methods.generateToken = async function () {
  try {
    const token = jwt.sign(
      { _id: this._id.toString() },
      process.env.SECRET_KEY
    );
    this.tokens = this.tokens.concat({ token: token });
    // console.log(token);
    await this.save();

    return token;
  } catch (err) {
    res.send("failed to geneerate token");
  }
};
signupSchema.pre("save", async function (next) {
  // console.log(`${this.spassword}`);
  this.spassword = await bcrypt.hashSync(this.spassword, 10);
  // console.log(`${this.spassword}`);
  next();
});
const signup = mongoose.model("signup", signupSchema);
const register = mongoose.model("register", registerSchema);

module.exports = { register, signup };
