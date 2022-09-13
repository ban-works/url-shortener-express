
require("dotenv").config();
const mongoose = require("mongoose");

const { DB_URI } = process.env;

const options = {
  connectTimeoutMS: 5000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose.connect(
    DB_URI,
  options,
  function (err) {
    console.log(err);
  }
);