const { response } = require('express');
const express = require('express');
const router = express.Router();

// Importing Easy Question For Responses
const User = require('../models/user-model')

router.post('/temproute/:id', async (req, res) => {
    var id = req.params.id
    
    var ideasy = '5f3923908cc1c1d5d1ee557f'
    var ideasy2 = '5f392a2e8cc1c1d5d1ee5580'
    try {
        const username = await User.findById(id);
        const template = {easyIds: [ideasy, ideasy2], moderateIds:['5f392af88cc1c1d5d1ee5584'], difficultIds: ['5f392cc68cc1c1d5d1ee558a']}
        // console.log(template)
        username.questionsIds.push(template)
        await username.populate('questionsIds.easyIds').populate('questionsIds.moderateIds').populate('questionsIds.difficultIds').execPopulate()
        // await username.save();
        username.questionsIds.forEach(question => console.log(question))
        res.send(username) 
    } catch (e) {
        console.log(e);
        res.send(e);
    } 
})

module.exports = router ;

/*
// const template = {easyIds: [ideasy, ideasy2], easyanswers: 'Hello World'}
        // username.responses.push(template)
        // let check = await username.populate('responses.easyIds').execPopulate() 
        // // console.log(username.responses)
        // username.responses.forEach(response => console.log(response))
        // // await username.save()
*/