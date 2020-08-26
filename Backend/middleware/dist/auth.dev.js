"use strict";

var JWT = require("jsonwebtoken");

require('dotenv').config();

module.exports = function (req, res, next) {
  var token = req.header("auth-token");
  if (!token) return res.send("No Token Entered !!");

  try {
    var verified = JWT.verify(token, process.env.JWTTOKEN);
    req.user = verified;
    next();
  } catch (e) {
    res.send(e);
    console.log(e);
  }
};