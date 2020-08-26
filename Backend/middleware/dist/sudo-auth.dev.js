"use strict";

var JWT = require('jsonwebtoken');

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
          console.log(verified);
          _context.next = 8;
          return regeneratorRuntime.awrap(User.findById(verified._id));

        case 8:
          check = _context.sent;

          if (check.issudoaccess) {
            req.user = verified;
            next();
          } else res.send("You Got Nothing Bruh .....");

          _context.next = 16;
          break;

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](3);
          console.log(_context.t0);
          res.send(_context.t0);

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 12]]);
};