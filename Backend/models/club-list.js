const mongoose = require('mongoose')

const clubs = mongoose.Schema({
    name : {
        type: String,
        requried : false 
    }
})

module.exports = mongoose.model('Club', clubs);