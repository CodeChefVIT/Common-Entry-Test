const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user-model');
const mongoose = require('mongoose');
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
        clientID: process.env.CLIENTID ,
        clientSecret:process.env.CLIENTSECRET,
        callbackURL: 'https://common-entry-test.herokuapp.com/auth/google/redirect'
    }, (accessToken, refreshToken, profile, done) => {
        User.findOne({googleId: profile.id}).then((currentUser) => {
            if(currentUser){
                console.log('user is: ', currentUser);
                done(null, currentUser);
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
                    console.log('created new user: ', newUser);
                    done(null, newUser);
                });
            }
            
        });
    })
);
