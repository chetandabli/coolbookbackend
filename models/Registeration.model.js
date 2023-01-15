const mongoose = require("mongoose");

const Registerationschema = mongoose.Schema({
    name: String,
    email: String,
    number: Number,
    password: String
    
});

const Registerationmodel = mongoose.model("user", Registerationschema);

module.exports = { Registerationmodel }