var envController = require( '../controller/environmentController.js' );

module.exports = function(app) {
    app.get( '/environments', function(req, res) {
        envController.getEnvironments()
            .then( function(models) {
                res.json( models );
            } )
            .catch( function(e) {
                res.status( 500 ).send( e );
            } );
    } );
};