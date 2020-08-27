const JWT = require("jsonwebtoken");
require('dotenv').config();

const User = require('../models/user-model')

module.exports = async function (req, res, next) {
    const token = req.header("auth-token")
    if (!token) return res.send(`No Token Entered !!`)

    try {
        const verified = JWT.verify(token, process.env.JWTTOKEN)
        const check = await User.findOne({email : verified.email})
        if (check.isadministrator.length > 0){
            req.user = check 
            next()
        }else 
            res.send(`You Got NO Admin Access `)
    } catch (e) {
        console.log(e);
        res.send(e);
    }
}