const express = require('express')
const router = express.Router();
const User = require('../models/user-model')

// Add Clubs to Apply
// Specifing Question on the Go 
// Making Configuration For Repeatation Usage 

router.get('/addclub/:id', async (req, res) => {
    var id = req.params.id ;
    try {
        const entity = User.find({_id: id});
        res.send(entity);
    } catch (e) {
        console.log(e);
        res.send(e);
    }
})


module.exports = router ;