var stackController = require( '../controller/stackController.js' );

module.exports = function(app) {
    app.get( '/stacks', function(req, res) {
        stackController.getStacks()
            .then( function(stacks) {
                res.json( stacks );
            } )
            .catch( function(e) {
                res.status( 500 ).send( e );
            } );
    } );
};