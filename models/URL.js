var mongoose = require("mongoose");

var URLSchema = mongoose.Schema({
    URL: String,
    suffix: String ,
    owner: String,
    dateCreated: Date,
    nbClicks: Number,
});

var URLModel = mongoose.model("URLs", URLSchema);

module.exports = URLModel;