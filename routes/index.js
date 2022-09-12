var express = require('express');
var router = express.Router();
const URLModel = require("../models/URL");

/* GET home page. */
router.get('/:suffix', async function(req, res, next) {
  let suffix = req.params.suffix
  console.log('suffix', suffix);
  if(suffix) {
    try{
      let requestedURL = await URLModel.findOne({suffix:suffix});
      if (requestedURL) {
        console.log(requestedURL);
        res.redirect(`${requestedURL.URL}`);
      }
      else{
        res.status(500).json("Unknown URL");

      }


    }
    catch(error){
      res.status(500).json(error);
    }
  }
});

module.exports = router;
