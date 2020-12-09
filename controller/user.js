module.exports = {
  signUp: async (req, res, next) => {
    try {
      res.status(200).send("sign up success");
    } catch (err) {
      res.status(404).send(err);
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
