const express = require('express');
const easyQuestions = require('../models/easy-questions');
const router = express.Router();

// Importing Easy Question For Responses
const General = require('../models/questions-general')

router.post('/temproute/:id', async (req, res) => {
    var id = req.params.id
    const temp = await new General({easyQuestions : id})
    console.log(temp)

    let check = 

    res.send(id);
})

module.exports = router ;