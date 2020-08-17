const express = require("express");
const mongoose = require("mongoose");

const passport = require("passport");


const router = express.Router();

router.get(
	"/auth/google",
	passport.authenticate("google", {
		scope: ["profile", "email"],
	})
);

// Callback route for google to redirect
router.get("/auth/google/redirect", passport.authenticate('google'),(req, res, next) => {
	user = req.user
	res.send(user)
});

module.exports = router;