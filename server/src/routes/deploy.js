var db = require( '../models' );

module.exports = function(app) {
    app.get( '/deploy', function(req, res) {
        db.Deploy.findAll().success( function(instances) {
            res.json( instances );
        } ).error( function(error) {
            res.render( 'error', {
                error: error,
                message: 'An error occured during retrieving deploy'
            } );
        } );
    } );
};