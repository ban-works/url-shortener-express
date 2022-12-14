var express = require("express");
var router = express.Router();
require("dotenv").config();
const URLModel = require("../models/URL");
const crypto = require("crypto");
const { DOMAIN } = process.env;

/* GET Homepage */

router.get("/", function (req, res, next) {
  res.redirect(`https://create.b-z.fr`);
});

/* POST shortlink. */
router.post("/shortlink", async function (req, res, next) {
  console.log(req.body);
  var httpRegex =
    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
  if (httpRegex.test(req.body.URL)) {
    try {
      let suffix;
      let suffixTest;
      
      if (req.body.suffix) {
        suffix = req.body.suffix;
        suffixTest = await URLModel.find({ suffix: suffix });
        
      } else {
        suffix = crypto.randomBytes(3).toString("hex");
        suffixTest = await URLModel.find({ suffix: suffix });
      }

      if (suffixTest.length == 0) {
        const newURL = new URLModel({
          URL: req.body.URL,
          suffix: suffix,
          owner: req.body?.owner,
          dateCreated: Date.now(),
        });
        const savedURL = await newURL.save();
        res.status(200).json(`${DOMAIN}/${savedURL.suffix}`);
      } else {
        res.status(300).json("Désolé, ce suffixe est déjà pris.");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(300).json(`Merci de renseigner une URL valide :)`);
  }
});

/* GET to page via shortlink */
router.get("/:suffix", async function (req, res, next) {
  let suffix = req.params.suffix;
  if (suffix) {
    try {
      let requestedURL = await URLModel.findOne({ suffix: suffix });
      if (requestedURL) {
        console.log(requestedURL);
        res.redirect(`${requestedURL.URL}`);
      } else {
        res.status(500).json("Unknown URL");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
});

module.exports = router;
