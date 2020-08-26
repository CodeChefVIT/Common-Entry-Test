"use strict";

var JWT = require("jsonwebtoken");

require('dotenv').config();

var User = require('../models/user-model');

module.exports = function _callee(req, res, next) {
  var token, verified, check;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          token = req.header("auth-token");

          if (token) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return", res.send("No Token Entered !!"));

        case 3:
          _context.prev = 3;
          verified = JWT.verify(token, process.env.JWTTOKEN);
          console.log(verified.email);
          _context.next = 8;
          return regeneratorRuntime.awrap(User.findOne({
            email: verified.email
          }));

        case 8:
          check = _context.sent;
          console.log(check);

          if (check.isadministrator != null) {
            req.user = verified;
            next();
          } else res.send("You Got NO Admin Access ");

          _context.next = 17;
          break;

        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](3);
          console.log(_context.t0);
          res.send(_context.t0);

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 13]]);
};