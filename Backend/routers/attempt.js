const express = require('express');
const router = express.Router();

// Importing Easy Question For Responses
const User = require('../models/user-model')

router.post('/temproute/:id', async (req, res) => {
    var id = req.params.id
    
    var ideasy = '5f3923908cc1c1d5d1ee557f'
    try {
        const username = await User.findById(id);
        const template = {easyIds: [ideasy], easyanswers: 'Hello World'}
        // username.responses.push(template)
        let check = await username.populate('responses.easyIds').execPopulate() 
        console.log(check)
        console.log(username.responses[0].easyIds)
        // await username.save()
        res.send(username)
    } catch (e) {
        console.log(e);
        res.send(e);
    } 
})

module.exports = router ;