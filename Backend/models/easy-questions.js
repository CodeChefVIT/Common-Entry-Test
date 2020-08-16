const mongoose = require('mongoose')

const easyQuestionSchema = mongoose.Schema({
    question: {
        type: String
    },
    author : {
        type: String 
    },
    club :{
        type: String 
    },
    domain : {
        type: String,
        requried: true
    }
})

module.exports = mongoose.model('Easy', easyQuestionSchema)