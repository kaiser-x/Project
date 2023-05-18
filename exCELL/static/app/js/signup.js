const mongoose = require("mongoose");
// mongoose.connect(
//   "mongodb+srv://excell:excell@cluster0.kkn3b.mongodb.net/tarun?retryWrites=true&w=majority",
//   { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
// );
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
});
const signup = mongoose.model("signup", signupSchema);
module.exports = signup;
