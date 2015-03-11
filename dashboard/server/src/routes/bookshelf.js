var User = require( '../bookshelf/init.js').bookshelf['users'];
module.exports = function(app) {
    app.get( '/bookshelf/users', function(req, res) {
        new User().fetchAll()
            .then( function(users) {
                res.json( users );
            } ).catch( function(error) {
            console.log( error );
            res.send( 'An error occured' );
        } );
    } );
};