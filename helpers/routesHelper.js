const Joi = require("joi");

module.exports = {
  validateBody: () => {
    return (req, res, next) => {
      const schema = Joi.object({
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
      });

      const validation = schema.validate(req.body);
      res.send(validation);
      next();
    };
  },
};
