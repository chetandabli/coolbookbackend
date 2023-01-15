const mongoose = require("mongoose");

const Bookschema = mongoose.Schema({
    title: String,
    category: String,
    summary: String,
    userID: String
});

const Bookmodel = mongoose.model("books", Bookschema);

module.exports = { Bookmodel }