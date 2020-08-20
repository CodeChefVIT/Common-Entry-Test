const mongoose = require('mongoose');

// Importing User Model 
const User = require('./user-model')

const rankSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        match: /[a-z0–9!#$%&’*+/=?^_`{|}~-]+(?:\.[a-z0–9!#$%&’*+/=?^_`{|}~-]+)*@(?:[a-z0–9](?:[a-z0–9-]*[a-z0–9])?\.)+[a-z0–9](?:[a-z0–9-]*[a-z0–9])?/,
        ref: 'User'
    },
    contact: {
        type: Number,
        match: /^([7-9][0-9]{9})$/g
    },
    marks: {
        type: Number
    },
    rank: {
        type: Number 
    }
})

module.exports = mongoose.model('EvaluationRank', rankSchema)