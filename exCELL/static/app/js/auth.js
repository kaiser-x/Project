const jwt = require("jsonwebtoken");
const { signup } = require("./model");
const auth = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
    console.log(verifyUser);
    const user = await signup.findOne({ _id: verifyUser._id });
    console.log(user);
    next();
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports = auth;
