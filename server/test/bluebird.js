var Promise = require( 'bluebird' );


var request = require( 'request' );

var db = require( '../src/jugglingdb/init.js' );


var errors = require( '../src/exception' );


var userController = require( '../src/controller/userController.js' );

var expect = require( 'chai' ).expect,
    should = require( 'chai' ).should();

describe( 'bluebird', function() {


    describe( 'userController', function() {
        it( 'should get user by id', function(done) {
            userController.getUserById( 2 ).then( function(user) {
                console.log( 'Promise resolved:' + JSON.stringify( user ) );
                done();
            }, function(err) {
                    done( err );
                } );
        } );
    } );
    it( 'should return promise', function(done) {

        Promise.resolve( request( 'http://www.google.com' ) )
            .then( function(result) {
                done();
            }, function(err) {
                    done( err );
                } );
    } );


    it( 'should return user in promise', function(done) {


        Promise.resolve()
            .then( function(model) {
                //model.should.have.property( 'name' );
                done();
            }, function(err) {
                    done( err );
                } );
    } );

    it( 'should catch custom error', function() {

        var error = new errors.ClientError( 'name required' );

        var promise = new Promise( function(resolve, reject) {
            throw error;
        } );

        promise.catch( errors.ClientError, function(e) {
            e.should.be.instanceof( errors.ClientError );
        } );



    } );


} );