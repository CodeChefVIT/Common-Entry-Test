const { MongoStore } = require('connect-mongo');
const mongoose = require('mongoose');

// Importing The Easy Medium Hard Questions 
// Making Them as Refernces 

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
    response: [
        QuestionId : {
            type : mongoose.ObjectId
        }
    ]
});


module.exports = mongoose.model('User', userSchema);

    // response: [{
    //     QuestionId : [],
    //     solution: [{
    //                 type: String,
    //                 default: null,
    //                 required: true  
    //             },
    //             {   
    //             type: String, 
    //             required: false,
    //             default: null 
    //         }
    //     ]
    // }]