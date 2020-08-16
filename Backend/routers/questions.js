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
    try {
        const easy = await Easy.find({})
        const moderate = await Moderate.find({})
        const difficult = await Difficult.find({})
        res.send(easy +  '\n' + moderate + '\n' + difficult)
    } catch (e) {
        console.log(e);
        res.send(e);
    }
})

// Route For Updating The Question Bank 
router.patch('/updatequestion/:id', async (req, res) => {
    var id = req.params.id
    const {question} = req.body ; 
    try {
        const easyUpdate = await Easy.findOneAndUpdate({_id: id},{$set: {question}})
        const moderateUpdate = await Moderate.findOneAndUpdate({_id: id},{$set: {question}})
        const difficultUpdate = await Difficult.findOneAndUpdate({_id: id},{$set: {question}})
        console.log(easyUpdate)
        console.log(moderateUpdate)
        console.log(difficultUpdate)
        var update ;
        if (easyUpdate != null)
            update = await (easyUpdate)
        if (moderateUpdate != null)
            update = await (moderateUpdate)
        if (difficultUpdate != null)
            update = await (difficultUpdate)
        update.question = question
        res.send(update)
    } catch (e) {
        console.log(e);
        res.send(e);
    }
})

// Route For Deleting The Questions in Questions Bank 
router.delete('/deletequestion', async (req, res) => {

})

module.exports = router;