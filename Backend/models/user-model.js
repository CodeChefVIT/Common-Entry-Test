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
    }
});
module.exports = mongoose.model('User', userSchema);
