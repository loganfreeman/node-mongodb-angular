/**
 *
 * @module groups route
 * @author scheng
 */

var groupController = require( '../controller/groupController.js' );

module.exports = function(app) {
    app.get( '/groups', function(req, res) {
        groupController.getGroups()
            .then( function(groups) {
                res.json( groups );
            } )
            .catch( function(e) {
                res.status( 500 ).send( e );
            } );
    } );
};