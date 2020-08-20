const mongoose = require('mongoose');

// Importing Sub Models Of The Schema 
const Easy = require('./easy-questions')
const Moderate = require('./moderate-questions')
const Difficult = require('./difficult-questions')

const QuestionSchema = mongoose.Schema({
    easyQuestions: [{
        type: mongoose.ObjectId,
        ref: 'Easy'
    }],
    moderateQuestions: [{
        type: mongoose.ObjectId,
        ref: 'Moderate'
    }],
    difficultQuestions: [{
        type: mongoose.ObjectId,
        ref: 'Difficult'
    }]
})

module.exports = mongoose.model('Questions', QuestionSchema)