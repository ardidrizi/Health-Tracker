const { Schema, model } = require("mongoose");
const bycrypt = require("bcryptjs");

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Middleware to hash the password before saving
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bycrypt.hash(this.password, 10);
  }
  next();
});

// Instance of the model
const User = model("User", userSchema);

module.exports = User;
