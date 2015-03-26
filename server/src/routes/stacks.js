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


    app.get( '/environment/:envid/stacks', function(req, res) {
        stackController.getStacksByEnv( req.params.envid )
            .then( function(stacks) {
                res.json( stacks );
            } )
            .catch( function(e) {
                res.status( 500 ).send( e );
            } );
    } );


    app.put( '/stack', function(req, res) {
        stackController.create( req.body )
            .then( function(stack) {
                res.json( stack );
            } )
            .catch( function(e) {
                res.status( 500 ).send( e );
            } );
    } );

    app.post( '/stack', function(req, res) {
        stackController.save( req.body )
            .then( function(stack) {
                res.json( stack );
            } )
            .catch( function(e) {
                res.status( 500 ).send( e );
            } );
    } );

    app.delete( '/stack/:id', function(req, res) {
        stackController.delete( req.params.id )
            .then( function() {
                res.status( 200 ).send( 'OK' );
            } )
            .catch( function(e) {
                res.status( 500 ).send( e );
            } );
    } );
};