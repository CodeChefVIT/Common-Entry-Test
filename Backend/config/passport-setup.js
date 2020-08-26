const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user-model');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
require('dotenv').config();


passport.serializeUser((user, done) => {
    done(null, user.id);
});


passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy({
        clientID: process.env.CLIENTID,
        clientSecret:process.env.CLIENTSECRET,
        callbackURL: 'http://localhost:3000/auth/google/redirect'
    }, (accessToken, refreshToken, profile, done) => {
        User.findOne({googleId: profile.id}).then((currentUser) => {
            if(currentUser){  
                const token = jwt.sign({
                    _id : currentUser._id ,
                    name : currentUser.name,
                    email : currentUser.email,
                }, process.env.JWTTOKEN, {expiresIn:"1d"})
                User.findById(currentUser._id).then((check) => {
                    check.token = token    
                    check.googleId = profile.id,
                    check.save().then((user) => {
                        console.log('user is: ', currentUser);
                        done(null, user)
                    }).catch((e) => console.log(e))
                })
                // done(null, currentUser);
            } else {
                var email = profile._json.email;
                var res = email.split("@")[1];
                if (!res.includes("gmail")){
                    console.log('I am Included as non Gmail ')
                    done("Error Is Here !! , Non Gmail Guy I am ", null )
                } // Similar Stuff For Verifying VIT Student Id .
                new User({
					    _id: new mongoose.Types.ObjectId(),
                        googleId: profile.id,
                        name: profile.displayName,
                        email:profile._json.email
                })
                .save().then((newUser) => {
                    const token = jwt.sign({
                        _id : newUser._id,
                        name: newUser.name,
                        email: newUser.email,
                    }, process.env.JWTTOKEN, {expiresIn: "1d"})
                    User.findById(newUser._id).then((check) => {
                        check.token = token
                        check.save().then((user) => {console.log('created new user: ', newUser);
                        done(null, user)}).catch((e) => console.log(e)).catch((e) => console.log(e))
                    })
                    // done(null, newUser);
                });
            }
            
        });
    })
);
