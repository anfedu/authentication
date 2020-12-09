const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create a schema
const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
});

// create a model
const User = mongoose.model("user", userSchema);

// Export the model
module.exports = User;
