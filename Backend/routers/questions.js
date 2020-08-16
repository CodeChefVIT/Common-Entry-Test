const express = require('express')
const router = express.Router();
const Difficult = require('../models/difficult-questions')
const Moderate = require('../models/moderate-questions')
const Easy = require('../models/easy-questions')

// Route For Posting Question 
router.post('/addquestion', async (req, res) => { 
    try {
        // Adding Status For The User Logged In 

        // End ( Temp Changes )
        const {question, author, club, type, domain} = req.body
        var addition = null ;
        if (type == 'Easy'){
            addition = new Easy({question, author, club, domain})
            await addition.save()
        } else if (type == 'Moderate'){
            addition = new Moderate({question, author, club, domain})
            await addition.save()
        } else {
            addition = new Difficult({question, author, club, domain})
            await addition.save()
        }
        res.send(addition);
    } catch (e) {
        console.log(e);
        res.send(e);
    }
})

// Route For Getting Question Bank 
router.get('/allquestions', async (req, res) => {

})

module.exports = router;