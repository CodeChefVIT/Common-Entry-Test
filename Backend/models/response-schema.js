const mongoose = require('mongoose');

// Importing User Model 
const User = require('./user-model')

const responseSchema = mongoose.Schema({
    userid: {
        type: mongoose.ObjectId,
        ref: 'User'
    },
    easyresponse:{
        type: mongoose.ObjectId,
        ref: 'Easy'
    }
})

module.exports = mongoose.model('Response', responseSchema)