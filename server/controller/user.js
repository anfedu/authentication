require("dotenv").config();
const JWT = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const joi = require("joi");

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

const schema = joi.object({
  name: joi.string().min(3).required(),
  email: joi.string().email().min(10).required(),
  password: joi.string().min(8).required(),
});

module.exports = {
  // function for signup
  signUp: async (req, res, next) => {
    try {
      const { name, email, password } = req.body;

      const { error } = schema.validate(req.body);

      if (error) {
        return res.status(500).send({
          status: 500,
          error: {
            message: error.details[0].message,
          },
        });
      }

      // check if there is a user with the same email
      const foundUser = await User.findOne({
        email,
      });
      if (foundUser) {
        return res.status(403).send({ error: "Email already exist" });
      }

      // create a new user
      const user = new User({
        name,
        email,
        password,
      });
      await user.save();

      const token = signToken(user);
      // respond with token
      res.status(200).json({ email, token });
    } catch (err) {
      res.status(404).send({ status: 404, error: err.message });
      console.log(err.message, "iki error 404");
    }
  },

  // function for signin
  signIn: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({
        email,
      });

      if (!user)
        return res.status(500).send({
          status: 500,
          error: {
            message: "Email or password invalid",
          },
        });

      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(user.password, salt);

      const validPass = bcrypt.compareSync(password, hash);

      if (!validPass)
        return res.status(500).send({
          status: 500,
          error: {
            message: "Email or password invalid",
          },
        });

      const token = JWT.sign({ id: user.id }, process.env.JWT_SECRET);

      res.status(200).send({
        status: 200,
        message: "login success",
        data: {
          email: user.email,
          token,
        },
      });
    } catch (err) {
      res.status(500).send({
        status: 500,
        message: err.message,
      });
    }
  },

  // function for secret
  secret: async (req, res, next) => {
    try {
      const users = await User.find({});
      res
        .status(200)
        .send({ status: 200, message: "read user success", data: users });
    } catch (err) {
      res.status(404).send(err);
    }
  },

  deleteUser: async (req, res, next) => {
    try {
      const id = req.params.id;
      const users = await User.findByIdAndDelete({
        _id: id,
      });
      res.status(200).send({ status: 200, message: "delete user success" });
    } catch (error) {
      res.status(500).send({ status: 500, message: "delete user failed" });
    }
  },
};
