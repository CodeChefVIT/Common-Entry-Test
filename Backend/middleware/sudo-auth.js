const JWT = require('jsonwebtoken')

module.exports = function (req, res, next) {
    const token = req.header("auth-token")
    if (!token) return res.send(`No Token Entered !!`)

    try {
        const verified = JWT.verify(token, 'secret')
        console.log(verified)
        if (verified.issudoaccess)
            next();
        else 
            res.send(`Your are not a sudo Accessor . Keep Your Shit Down`)
        
    } catch (e) {
        console.log(e);
        res.send(e);
    }
}