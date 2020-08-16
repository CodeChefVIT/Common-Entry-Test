const mongoose = require('mongoose')

const difficultQuestionSchema = mongoose.Schema({
    question: {
        type: String
    },
    author : {
        type: String 
    },
    club :{
        type: String 
    }
})


module.exports = mongoose.model('Difficult', difficultQuestionSchema)