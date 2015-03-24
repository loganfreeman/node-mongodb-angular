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

    /**
     * add a user to a group
     *
     * 
     */
    app.put( '/groups/:groupid/:userid', function(req, res) {
        var userid = req.params.userid;
        var groupid = req.params.groupid;
        groupController.addUserToGroup( userid, groupid )
            .then( function(model) {
                return model.group_id;
            } )
            .then( function(group_id) {
                return groupController.getGroup( group_id );
            } )
            .then( function(group) {
                res.json( group );
            } )
            .catch( function(e) {
                res.status( 500 ).send( e );
            } );
    } );
};