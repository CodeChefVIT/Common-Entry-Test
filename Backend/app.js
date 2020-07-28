const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
const cors = require('cors')
const flash = require('connect-flash')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
require('dotenv').config();


const app = express()

const PORT = process.env.PORT || 3000 

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.use(
    session({
      secret: process.env.SECRET,
      resave: true,
      saveUninitialized: true,
      store: new MongoStore({
        url: process.env.MONGOURI,
        collection: 'sessions'
      })
    }) 
);

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());  


app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});   

app.listen(PORT, console.log(`Server Running on Port ${PORT}`))
