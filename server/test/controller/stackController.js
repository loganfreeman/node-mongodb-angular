/**
 *
 *
 *
 *
 * @author scheng
 * 
 */


var controller = require( '../../src/controller/stackController.js' );

var db = require( '../../src/jugglingdb/init.js' );


var _ = require( 'lodash' );

var expect = require( 'chai' ).expect,
    should = require( 'chai' ).should();


var helpers = require( '../helpers.js' );

var NullReferenceError = require( '../../src/exception' ).NullReferenceError;




describe( 'stackController', function() {

    it( 'should update description', function(done) {
        var description = 'this is modified by stackController' + +new Date;
        var instance = {
            description: description,
            id: 1
        };
        controller.save(instance)
            .then( function(instance) {
                instance.description.should.be.eq( description );
            } )
            .catch( NullReferenceError, function(e) {
                throw e;
            } )
            .then( function() {
                done();
            } )
            .catch( function(e) {
                done( e );
            } );
    } );

    it( 'should create new stack', function(done) {
        var data = {
            name: 'Temp',
            description: 'Created by stackController',
            environment_id: 1
        };
        controller.create( data )
            .then( function(model) {
                helpers.verifyId( model, db['stack'] );
                // console.log( model );
                return model;
            } )
            .then( function(stack) {
                return controller.delete( stack.id );
            } )
            .then( function() {
                done();
            } )
            .catch( function(e) {
                done( e );
            } );
    } );


    it( 'should return stacks', function(done) {
        controller.getStacks()
            .then( function(models) {

                helpers.verifyArray( models, db['stack'] );
                models.length.should.be.gt( 0 );

                // stack belongs to environment
                _.each( models, function(model) {
                    // model.should.have.property( '$instances' );
                    // model.$instances.should.be.instanceof( Array );
                    // console.log( model );
                    // console.log( JSON.stringify( model ) );
                } );
                done();
            }, function(err) {
                    done( err );
                } );
    } );


    it( 'should return stacks by env', function(done) {
        controller.getStacksByEnv( 1 )
            .then( function(models) {
                helpers.verifyArray( models, db['stack'] );
                _.each( models, function(model) {
                    model.instances( function(err, instances) {
                        helpers.verifyArray( instances, db['instance'] );
                    } );
                } );
                done();
            } )
            .catch( function(err) {
                done( err );
            } );
    } );


} );