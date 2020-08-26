const JWT = require('jsonwebtoken')
require('dotenv').config();

const User = require('../models/user-model')

module.exports = async function (req, res, next) {
    const token = req.header("auth-token")
    if (!token) return res.send(`No Token Entered !!`)

    try {
        const verified = JWT.verify(token, process.env.JWTTOKEN)
        console.log(verified)
        const check = await User.findById(verified._id)
        if (check.issudoaccess){
            req.user = verified
            next()
        }else 
            res.send(`You Got Nothing Bruh .....`)
    } catch (e) {
        console.log(e);
        res.send(e);
    }
}