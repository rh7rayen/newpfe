const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 25,
  },
  lastname: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 25,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true, // Make sure that each email is unique
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  role: {
    type: String,
    default: "user",
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  activationCode: {
    type: String,
  },
  image_profile: {
    type: String,
    default: "user.png",
  },

  classe_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Classe",
  },
});

userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(this.toJSON(), "ThePassword");
  return token;
};

userSchema.methods.checkPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
