const express = require('express')
const router = express.Router();
const User = require('../models/user-model');
const { route } = require('./auth');

// Add Clubs to Apply
// Specifing Question on the Go 
// Making Configuration For Repeatation Usage 

// Route For Adding Mobile Number For An User 
router.post('/addmobilenumber/:id', async(req, res) => {
    var id = req.params.id ;
    const {number} = req.body 
    try {
        const entity = await User.findById(id);
        entity.contact = number ;
        await entity.save();
    } catch (e) {
        console.log(e);
        res.send(e);
    }
})


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

// Route For Posting Domains For An User 
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

// Route For Getting All The Infos of the User --> To Be Restricted to Admin 
router.get('/getuserinfo/:id', async (req, res) => {
    var id = req.params.id ;
    try {
        const entity = await User.findById(id);
        res.send(entity)
    }catch (e){
        console.log(e)
        res.send(e)
    }
})

// Route For Updating The Domain Of an User or Clubs For an User
router.patch('/updateuserinfo/:id', async (req, res) => {
    var id = req.params.id ;
    const {clubs, domain} = req.body ;
    try {
        const entity = await User.findById(id);
        if (clubs || domain){
            console.log(`Inside The First If Statement`)
            if (domain){
                entity.domain = domain 
            }
            if (clubs){
                entity.clubs = clubs 
            }
        }
        await entity.save();
        res.send(entity)
    }
    catch (e){
        console.log(e);
        res.send(e);
    }
})

module.exports = router ;