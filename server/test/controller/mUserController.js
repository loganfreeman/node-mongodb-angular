var controller = require( '../../src/controller/mUserController.js' );

var _ = require( 'lodash' );

var expect = require( 'chai' ).expect,
    should = require( 'chai' ).should();


var helpers = require( '../helpers.js' );

var Promise = require( 'bluebird' );

var mongoose = require( 'mongoose' );

var NullReferenceError = require( '../../src/exception' ).NullReferenceError;


var conn;

/**
 * Mongoose connection helper.
 */

function connect() {
    return mongoose.createConnection( 'mongodb://localhost/express_goose_test' );
}

describe( 'mongoose User Controller', function() {

    this.timeout( 5000 );
    before( function(done) {
        conn = mongoose.connect( 'mongodb://localhost/devops' ).connection;
        conn.once( 'open', function() {
            controller.createUser( {
                firstname: 'barry',
                lastname: 'allan',
                username: 'barry.allan',
                email: 'ballan@flash.com',
                password: 'test'
            } )
                .then( function(user) {
                    user.email.should.be.eq( 'ballan@flash.com' );

                    done();
                } )
                .catch( function(err) {
                    return err.name == 'ValidationError';
                }, function(err) {
                        done();
                    } );
        } )
            .on( 'error', function(err) {
                throw err;
            } );

    } );

    after( function(done) {
        controller.getUser( {
            email: 'ballan@flash.com'
        } ).then( function(user) {
            if (!user) {
                done();
            } else {
                user.email.should.be.eq( 'ballan@flash.com' );
                user.remove( function(err) {
                    if (err) {
                        done( err );
                    } else {
                        done();
                    }
                } );
            }

        } );
    } );
    it( 'should return a Promise', function(done) {


        controller.getUser( {
            email: 'ballan@flash.com'
        } ).then( function(user) {
            user.email.should.be.eq( 'ballan@flash.com' );
            done();
        } );

    } );



} );