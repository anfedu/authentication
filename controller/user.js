const User = require("../models/user");

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

      newUser.save();

      // respond with token
      res.json({ user: "created" });
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
