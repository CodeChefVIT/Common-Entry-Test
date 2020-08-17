const mongoose = require('mongoose');


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
    alpha: [{
        QuestionId : [],
        solution: {
            type: String,
            requried: false 
        }
    }]
});
module.exports = mongoose.model('User', userSchema);
