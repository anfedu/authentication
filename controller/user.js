require("dotenv").config();
const JWT = require("jsonwebtoken");
const User = require("../models/user");

const signToken = (user) => {
  return JWT.sign(
    {
      iss: "Anf edu",
      sub: user.id,
      iat: new Date().getTime(), // curent time
      exp: new Date().setDate(new Date().getDay() + 1), // curent time + 1
    },
    process.env.JWT_SECRET
  );
};

module.exports = {
  signUp: async (req, res, next) => {
    try {
      const { name, email, password } = req.body;

      // check if there is a user with the same email
      const foundUser = await User.findOne({
        email,
      });
      if (foundUser) {
        return res.status(403).send({ error: "Email already" });
      }

      // create a new user
      const newUser = new User({
        name,
        email,
        password,
      });
      await newUser.save();

      const token = signToken(newUser);
      // respond with token
      res.status(200).json({ token });
    } catch (err) {
      res.status(404).send({ status: 404, error: err.message });
      console.log(err.message, "iki error 404");
    }
  },
  signIn: async (req, res, next) => {
    try {
      res.status(200).send("sign in success");
    } catch (err) {
      res.status(404).send(err);
    }
  },
  secret: async (req, res, next) => {
    try {
      res.status(200).send("secret success");
    } catch (err) {
      res.status(404).send(err);
    }
  },
};
