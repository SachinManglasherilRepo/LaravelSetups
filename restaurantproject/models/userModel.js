const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "user is required field"],
    },
    email: {
      type: String,
      required: [true, "email is required field"],
    },
    password: {
      type: String,
      required: [true, "password is required field"],
    },
    address: {
      type: Array,
    },
    phone: {
      type: String,
      required: [true, "Phone is required field"],
    },
    userType: {
      type: String,
      default: "client",
    },
    profile: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
