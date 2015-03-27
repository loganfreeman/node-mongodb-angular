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


    app.put( '/group', function(req, res) {
        groupController.create( req.body )
            .then( function(group) {
                res.json( group );
            } )
            .catch( function(err) {
                res.status( 500 ).send( err );
            } );
    } );

    app.post( '/group', function(req, res) {
        groupController.save( req.body )
            .then( function(group) {
                res.json( group );
            } )
            .catch( function(e) {
                res.status( 500 ).send( e );
            } );
    } );

    app.get( '/group/:id', function(req, res) {
        groupController.getDeployById( req.params.id )
            .then( function(group) {
                res.json( group );
            } )
            .catch( function(e) {
                res.status( 500 ).send( e );
            } );
    } );

    app.delete( '/group/:id', function(req, res) {
        groupController.delete( req.params.id )
            .then( function() {
                res.status( 200 ).send( 'OK' );
            } )
            .catch( function(err) {
                res.status( 500 ).send( err );
            } );
    } );
};