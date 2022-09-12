var express = require("express");
var router = express.Router();
require("dotenv").config();
const URLModel = require("../models/URL");
const crypto = require("crypto");
const domain = "http://localhost:3000";
const { DOMAIN } = process.env;

/* GET home page. */
router.post("/", async function (req, res, next) {
  var httpRegex =
    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
  if (httpRegex.test(req.body.URL)) {
    try {
      let suffix = crypto.randomBytes(6).toString("hex");
      console.log(suffix);
      const newURL = new URLModel({
        URL: req.body.URL,
        suffix: suffix,
        owner: req.body.owner,
        dateCreated: Date.now(),
      });
      const savedURL = await newURL.save();
      res.status(200).json(`${DOMAIN}/${savedURL.suffix}`);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(500).json(`Invalid URL`);
  }
});

module.exports = router;
