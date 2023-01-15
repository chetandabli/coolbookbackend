const Bookroute = require("express").Router();
const { validator } = require("../middlewares/validator")
const { Bookmodel } = require("../models/Books.model")
const express = require("express");
const jwt = require('jsonwebtoken');

Bookroute.use(express.json());
Bookroute.use(validator);



Bookroute.get("/", async (req, res) => {
  try {
    let data = await Bookmodel.find(req.body);
    res.json(data)
  } catch (error) {
    console.log(error)
  }
});
Bookroute.post("/", async (req, res) => {
  let data = req.body;
  try {
    let book = new Bookmodel(data);
    await book.save()
    res.status(200).json({message: "Book Added"});
  } catch (error) {
    console.log(error)
  }
});
Bookroute.delete("/:id", async (req, res) => {
  let id = req.params.id;
  try {
    await Bookmodel.findByIdAndDelete(id);
    res.status(200).json({message: "Book Deleted"});
  } catch (error) {
    console.log(error)
  }
});
Bookroute.patch("/:id", async (req, res) => {
  let id = req.params.id;
  let data = req.body;
  try {
    await Bookmodel.findByIdAndUpdate(id, data);
    res.status(200).json({message: "Book category updated"});
  } catch (error) {
    console.log(error)
  }
});

module.exports = { Bookroute };
