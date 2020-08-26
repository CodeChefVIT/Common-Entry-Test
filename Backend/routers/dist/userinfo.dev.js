"use strict";

var express = require('express');

var router = express.Router();

var User = require('../models/user-model');

var sudoauth = require('../middleware/sudo-auth');

var auth = require('../middleware/auth');

var mongoose = require('mongoose'); // Add Clubs to Apply
// Specifing Question on the Go 
// Making Configuration For Repeatation Usage 
// Route For Adding Mobile Number For An User 


router.post('/addmobilenumber/:id', function _callee(req, res) {
  var id, number, entity;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          id = req.params.id;
          number = req.body.number;
          _context.prev = 2;
          _context.next = 5;
          return regeneratorRuntime.awrap(User.findById(id));

        case 5:
          entity = _context.sent;
          entity.contact = number;
          _context.next = 9;
          return regeneratorRuntime.awrap(entity.save());

        case 9:
          res.send(entity);
          _context.next = 16;
          break;

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](2);
          console.log(_context.t0);
          res.send(_context.t0);

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 12]]);
}); // Route For Posting Clubs For An User 

router.post('/addclub/:id', function _callee2(req, res) {
  var id, clubs, entity;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          id = req.params.id;
          clubs = req.body.clubs;
          _context2.prev = 2;
          _context2.next = 5;
          return regeneratorRuntime.awrap(User.findOne({
            _id: id
          }));

        case 5:
          entity = _context2.sent;
          entity.clubs = clubs;
          _context2.next = 9;
          return regeneratorRuntime.awrap(entity.save());

        case 9:
          res.send(entity);
          _context2.next = 16;
          break;

        case 12:
          _context2.prev = 12;
          _context2.t0 = _context2["catch"](2);
          console.log(_context2.t0);
          res.send(_context2.t0);

        case 16:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[2, 12]]);
}); // Route For Posting Domains For An User 

router.post('/adddomain/:id', function _callee3(req, res) {
  var id, domain, entity;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          id = req.params.id;
          domain = req.body.domain;
          _context3.prev = 2;
          _context3.next = 5;
          return regeneratorRuntime.awrap(User.findOne({
            _id: id
          }));

        case 5:
          entity = _context3.sent;
          entity.domain = domain;
          _context3.next = 9;
          return regeneratorRuntime.awrap(entity.save());

        case 9:
          res.send(entity);
          _context3.next = 16;
          break;

        case 12:
          _context3.prev = 12;
          _context3.t0 = _context3["catch"](2);
          console.log(_context3.t0);
          res.send(_context3.t0);

        case 16:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[2, 12]]);
}); // Route For Getting All The Infos of the User --> To Be Restricted to Admin 

router.get('/getuserinfo/:id', function _callee4(req, res) {
  var id, entity;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          id = req.params.id;
          _context4.prev = 1;
          _context4.next = 4;
          return regeneratorRuntime.awrap(User.findById(id));

        case 4:
          entity = _context4.sent;
          res.send(entity);
          _context4.next = 12;
          break;

        case 8:
          _context4.prev = 8;
          _context4.t0 = _context4["catch"](1);
          console.log(_context4.t0);
          res.send(_context4.t0);

        case 12:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[1, 8]]);
}); // Route For Updating The Domain Of an User or Clubs For an User

router.patch('/updateuserinfo/:id', function _callee5(req, res) {
  var id, _req$body, clubs, domain, entity;

  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          id = req.params.id;
          _req$body = req.body, clubs = _req$body.clubs, domain = _req$body.domain;
          _context5.prev = 2;
          _context5.next = 5;
          return regeneratorRuntime.awrap(User.findById(id));

        case 5:
          entity = _context5.sent;

          if (clubs || domain) {
            console.log("Inside The First If Statement");

            if (domain) {
              entity.domain = domain;
            }

            if (clubs) {
              entity.clubs = clubs;
            }
          }

          _context5.next = 9;
          return regeneratorRuntime.awrap(entity.save());

        case 9:
          res.send(entity);
          _context5.next = 16;
          break;

        case 12:
          _context5.prev = 12;
          _context5.t0 = _context5["catch"](2);
          console.log(_context5.t0);
          res.send(_context5.t0);

        case 16:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[2, 12]]);
}); // Route For Giving The Admin Access To the Specified User --> Limited to Sudo Accessors to give the rights 

router.post('/addtheadmin', auth, sudoauth, function _callee6(req, res) {
  var _req$body2, email, club, usertobegrantedaccessrights, template;

  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _req$body2 = req.body, email = _req$body2.email, club = _req$body2.club;
          _context6.prev = 1;
          _context6.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 4:
          usertobegrantedaccessrights = _context6.sent;
          template = {
            isadmin: true,
            club: club
          };
          console.log(template);
          usertobegrantedaccessrights.isadministrator.push(template); // await usertobegrantedaccessrights.save()

          res.send(usertobegrantedaccessrights);
          _context6.next = 15;
          break;

        case 11:
          _context6.prev = 11;
          _context6.t0 = _context6["catch"](1);
          console.log(_context6.t0);
          res.send(_context6.t0);

        case 15:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[1, 11]]);
});
module.exports = router;