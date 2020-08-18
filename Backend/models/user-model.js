const mongoose = require('mongoose');

const Easy = require('./easy-questions')

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    googleId: {
        type: String,
    },
    name: {
        type: String
    },
    email: {
        type: String,
        match: /[a-z0–9!#$%&’*+/=?^_`{|}~-]+(?:\.[a-z0–9!#$%&’*+/=?^_`{|}~-]+)*@(?:[a-z0–9](?:[a-z0–9-]*[a-z0–9])?\.)+[a-z0–9](?:[a-z0–9-]*[a-z0–9])?/,
    },
    contact: {
        type: Number,
        match: /^([7-9][0-9]{9})$/g
    },
    domain: {
        type: Array,
        default: [],
        requried: false
    },
    isadmin: {
        type: Boolean,
        required: false, 
        default: false
    },
    clubs: [{
        type: String,
        required : false
    }],
    
});


module.exports = mongoose.model('User', userSchema);