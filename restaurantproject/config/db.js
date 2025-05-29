const mongoose = require("mongoose");

// mongoose.connect(url)
const connectiondb = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/food-app");
    console.log(`connected to database ${mongoose.connection.host}`);
  } catch (error) {
    console.log("error", error);
  }
};

module.exports = connectiondb;
