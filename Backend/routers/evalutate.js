const express = require('express')
const router = express.Router();

// Importing All The Necessary Models
const User = require('../models/user-model')
const Easy = require('../models/easy-questions')
const Moderate = require ('../models/moderate-questions')
const Difficult = require('../models/difficult-questions')


// Route For Getting All The Students IDs with Responses 
// Route For Posting Marks 
// Route For Showing The Rank List of Student For Particular domain 

// Route For Getting All The Student Responses with Ids --> Auth for Admins Only 
router.get('/getresponses/:id', async (req, res) => {
    var id = req.params.id 
    try {
        const user = await User.findById(id);
        await user.easyresponses.populate('id').execPopulate();
        res.send(user);
    }catch (e){
        console.log(e);
        res.send(e);
    }
})

module.exports = router ;