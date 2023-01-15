const loginRaoute = require("express").Router();
const { Registerationmodel } = require("../models/Registeration.model");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

loginRaoute.use(express.json());

loginRaoute.post("/", async (req, res) => {
  let {email, password, checkbox} = req.body;
  if(checkbox){
    var time = "30d"
  }else{
    var time = "1d"
  }
  try {
    const userData = await Registerationmodel.findOne({email});
    if(userData.length != 0){
        let flag = await bcrypt.compare(password, userData.password)
        let userID=userData._id
        if(flag){
            const token = jwt.sign({userID:userID}, process.env.secretKey , { expiresIn: `${time}` });
            res.status(200).json({ message: "Login done", token: token, name: userData.name});
        }else{
            res.status(404).json({ message: "incorrect credantial" })
        }
    }else{
        res.status(404).json({ message: "user not found" })
    }
  } catch (error) {
    console.log("error:", error);
    res.status(404).json({ message: "incorrect credantial" })
  }
});

module.exports = { loginRaoute };
