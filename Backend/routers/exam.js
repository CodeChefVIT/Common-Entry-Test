const express = require('express')
const router = express.Router();
const User = require('../models/user-model');
const { route } = require('./auth');

// Add Clubs to Apply
// Specifing Question on the Go 
// Making Configuration For Repeatation Usage 

// Route For Posting Clubs For An User 
router.post('/addclub/:id', async (req, res) => {
    var id = req.params.id ;
    const {clubs} = req.body 
    try {
        const entity = await User.findOne({_id: id});
        entity.clubs = clubs
        await entity.save();
        res.send(entity);
    } catch (e) {
        console.log(e);
        res.send(e);
    }
})

router.post('/adddomain/:id', async (req, res) => {
    var id = req.params.id ;
    const {domain} = req.body 
    try {
        const entity = await User.findOne({_id: id});
        entity.domain = domain 
        await entity.save();
        res.send(entity)
    } catch (e) {
        console.log(e)
        res.send(e);
    }
})


module.exports = router ;