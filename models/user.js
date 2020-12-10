const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

// create a schema
const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async (next) => {
  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(10);
    bcrypt.hash("user password over here", salt);
  } catch (err) {
    next(err);
  }
});

// create a model
const User = mongoose.model("user", userSchema);

// Export the model
module.exports = User;
