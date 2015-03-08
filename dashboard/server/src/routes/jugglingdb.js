var User = require( '../jugglingdb/user.js' ).User;


module.exports = function(app) {
    app.get( '/jugglingdb/users', function(req, res) {
        User.all( function(err, results) {
            if (err) {
                res.json( err );
            } else {
                res.json( results );
            }
        } );
    } );
};