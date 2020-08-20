const mongoose = require('mongoose');

const rankSchema = mongoose.Schema({
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
    marks: {
        type: Number
    }
})

module.exports = mongoose.model('EvaluationRank', rankSchema)