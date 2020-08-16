const express = require('express')
const ClubList = require('../models/club-list')
const router = express.Router();


// Route For Adding The Clubs --> Specifically To CC Members
router.post('/addclub', async (req, res) => {
    try {
        // Adding Status Based on User's Preference ID

        // End (Temp Changes)
        const {}
    } catch (e) {
        console.log(e);
        res.send(e);
    }
})