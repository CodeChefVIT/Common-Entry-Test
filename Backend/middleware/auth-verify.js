module.exports = {
    ensureAuthenticated: function(req, res, next) {
        if (req.isAuthenticated()){
            return next();
        }
        res.json('Please Login , Status : ' + req.isAuthenticated());
    },
    forwardAuthenticated: function(req, res, next) {
        if (!req.isAuthenticated()) {
          return next();
        }
        res.redirect('/users/dashboard');      
      }    
}