const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name"],
  },
  username: {
    type: String,
    unique: [true, "username should be unique"],
    required: [true, "Please specify a username"],
  },
  email: {
    type: String,
    unique: [
      true,
      "The Email you provided is already linked with another account",
    ],
    required: [true, "Please provide a valid email"],
    lowercase: true,
    validate: [validator.isEmail, "Please Provide a valide E-mail Address"],
  },
  password: {
    type: String,
    minlength: 8,
    required: [true, "Please Provide a password"],
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Password do not match",
    },
  },
  passwordChangedAt: Date,
});

// Hashing the password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.confirmPassword = undefined;
});

// instance method for comparing passwords
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }

  // False means NOT changed
  return false;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
