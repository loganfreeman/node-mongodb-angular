/**
 *
 *
 *
 * @author scheng
 */


var controller = require( '../../src/controller/instanceController.js' );

var db = require( '../../src/jugglingdb/init.js' );


var _ = require( 'lodash' );

var expect = require( 'chai' ).expect,
    should = require( 'chai' ).should();


var helpers = require( '../helpers.js' );



describe( 'instanceController', function() {

    it( 'should create new instances', function(done) {
        var data = {
            name: 'Temp',
            description: 'Created by instanceController',
            stack_id: 1,
            ip: '192.168.100.128/25'
        };
        controller.create( data )
            .then( function(model) {
                helpers.verifyId( model, db['instance'] );
                // console.log( model );
                model.ip.should.be.eq( '192.168.100.128/25' );
                return model;
            } )
            .then( function(instance) {
                return controller.delete( instance.id );
            } )
            .then( function() {
                done();
            } )
            .catch( function(e) {
                done( e );
            } );
    } );

    it( 'should return instances', function(done) {
        controller.getInstances()
            .then( function(models) {

                helpers.verifyArray( models, db['instance'] );
                _.each( models, function(model) {
                    // instance belongs to stack
                    model.stack( function(err, stack) {
                        stack.should.be.instanceof( db['stack'] );
                    } );
                    // instance has many deploy
                    model.deploys( function(err, deploys) {
                        helpers.verifyArray( deploys, db['deploy'] );
                    } );
                } );
                done();
            }, function(err) {
                    done( err );
                } );
    } );

    it( 'should return instances by stack Id', function(done) {
        controller.getInstancesByStack( 1 )
            .then( function(models) {
                helpers.verifyArray( models, db['instance'] );
                models.length.should.be.gt( 0 );
                done();
            } )
            .catch( function(err) {
                done( err );
            } );
    } );
} );