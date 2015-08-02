var instanceController = require( '../controller/instanceController.js' );
module.exports = function(app) {
    app.get( '/instances', function(req, res) {
        instanceController.getInstances()
            .then( function(instances) {
                res.json( instances );
            } )
            .catch( function(e) {
                res.status( 500 ).send( e );
            } );
    } );


    app.put( '/instance', function(req, res) {
        instanceController.create( req.body )
            .then( function(stack) {
                res.json( stack );
            } )
            .catch( function(e) {
                res.status( 500 ).send( e );
            } );
    } );

    app.post( '/instance', function(req, res) {
        instanceController.save( req.body )
            .then( function(stack) {
                res.json( stack );
            } )
            .catch( function(e) {
                res.status( 500 ).send( e );
            } );
    } );

    app.delete( '/instance/:id', function(req, res) {
        instanceController.delete( req.params.id )
            .then( function() {
                res.status( 200 ).send( 'OK' );
            } )
            .catch( function(e) {
                res.status( 500 ).send( e );
            } );
    } );


    app.get( '/instances/stack/:stackid', function(req, res) {
        instanceController.getInstancesByStack( req.params.stackid )
            .then( function(instances) {
                res.json( instances );
            } )
            .catch( function(e) {
                res.status( 500 ).send( e );
            } );
    } );

};