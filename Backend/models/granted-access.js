const mongoose = require('mongoose')

const usersWithReadAndWriteAccess = mongoose.Schema({
    email : {
        type: String,
        required : true
    },
    name : {
        type: String,
        required : true  
    }
})

module.exports = mongoose.model('GrantedAccess', usersWithReadAndWriteAccess);