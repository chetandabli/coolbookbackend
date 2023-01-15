const ragistrationRaoute = require("express").Router();
const { Registerationmodel } = require("../models/Registeration.model");
const express = require("express");
const bcrypt = require("bcrypt");

ragistrationRaoute.use(express.json());

ragistrationRaoute.post("/", async (req, res) => {
  let { name, email, password, number } = req.body;
  bcrypt.hash(password, 5, async (err, hash) => {
    if (err) {
      console.log("error", err);
    } else {
      try {
        const newUser = new Registerationmodel({ name, email, number, password: hash });
        await newUser.save();
        res.status(200).json({ message: "Resgistration done" })
      } catch (error) {
        console.log(error);
        res.status(404).json({ message: "Resgistration not complated" })
      }
    }
  });
});

module.exports = { ragistrationRaoute };
