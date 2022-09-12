var express = require('express');
var router = express.Router();

const URLModel = require("../models/URL");
const crypto = require("crypto");
const domain = "http://localhost:3000"

/* GET home page. */
router.post('/', async function(req, res, next) {
    console.log('body',req.body);
    try {
        let suffix = crypto.randomBytes(6).toString("hex")
        console.log(suffix)
        const newURL = new URLModel({
          URL: req.body.URL,
          suffix: suffix ,
          owner: req.body.owner,
          dateCreated: Date.now(),
        });
        const savedURL = await newURL.save();
        console.log(savedURL);
        res.status(200).json(`${domain}/${savedURL.suffix}`);
      } catch (error) {
        res.status(500).json(error);
      }

});

module.exports = router;
