const express = require('express')
const router = express.Router();
const User = require('../models/user-model');
const mongoose = require('mongoose')
// Add Clubs to Apply
// Specifing Question on the Go 
// Making Configuration For Repeatation Usage 

// Importing All The Middlewares 
const adminauth = require('../middleware/admin-auth')
const auth = require('../middleware/auth')
const sudoauth = require('../middleware/sudo-auth')

// Route For Adding Mobile Number For An User 
router.post('/addmobilenumber/:id', auth, async(req, res) => {
    var id = req.params.id ;
    const {number} = req.body 
    try {
        const entity = await User.findById(id);
        entity.contact = number ;
        await entity.save();
        res.send(entity)
    } catch (e) {
        console.log(e);
        res.send(e);
    }
})


// Route For Posting Clubs For An User 
router.post('/addclub', auth, async (req, res) => {
    
    const {clubs} = req.body 
    try {
        const entity = await User.findOne({_id: req.user._id});
        entity.clubs = clubs
        await entity.save();
        res.send(entity);
    } catch (e) {
        console.log(e);
        res.send(e);
    }
})

// Route For Posting Domains For An User 
router.post('/adddomain', auth, async (req, res) => {
    const {domain} = req.body 
    try {
        const entity = await User.findOne({_id: req.user._id});
        entity.domain = domain 
        await entity.save();
        res.send(entity)
    } catch (e) {
        console.log(e)
        res.send(e);
    }
})

// Route For Getting All The Infos of the User --> To Be Restricted to Admin 
router.get('/getuserinfo', adminauth,async (req, res) => {
    try {
        const entity = await User.findById(req.user._id);
        res.send(entity)
    }catch (e){
        console.log(e)
        res.send(e)
    }
})

// Route For Updating The Domain Of an User or Clubs For an User
router.patch('/updateuserinfo', auth, adminauth, async (req, res) => {
    const {clubs, domain} = req.body ;
    try {
        const entity = await User.findById(req.user._id);
        if (clubs || domain){
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

// Route For Giving The Admin Access To the Specified User --> Limited to Sudo Accessors to give the rights 
router.post('/addtheadmin', auth, sudoauth, async (req, res) => {
    const {email, club} = req.body ;
    try {
        const usertobegrantedaccessrights = await User.findOne({email})
        var template = {isadmin: true,club: club}
        console.log(template)
        usertobegrantedaccessrights.isadministrator.push(template)
        // await usertobegrantedaccessrights.save()
        res.send(usertobegrantedaccessrights)
    }catch (e) {
        console.log(e);
        res.send(e);
    }
})

module.exports = router ;