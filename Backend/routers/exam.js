const express = require('express')
const router = express.Router();
const User = require('../models/user-model')

// Add Clubs to Apply
// Specifing Question on the Go 
// Making Configuration For Repeatation Usage 

/
router.post('/addclub/:id', async (req, res) => {
    var id = req.params.id ;
    const {clubs} = req.body 
    try {
        const entity = await User.findOne({_id: id});
        console.log(clubs)
        console.log(entity.clubs)
        entity.clubs = clubs
        await entity.save();
        res.send(entity);
    } catch (e) {
        console.log(e);
        res.send(e);
    }
})




module.exports = router ;