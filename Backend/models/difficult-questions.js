const mongoose = require('mongoose')

const difficultQuestionSchema = mongoose.Schema({
    question: {
        type: String
    },
    authorid : {
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


module.exports = mongoose.model('Difficult', difficultQuestionSchema)