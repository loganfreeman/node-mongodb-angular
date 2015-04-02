var controller = require( '../../src/controller/mUserController.js' );

var _ = require( 'lodash' );

var expect = require( 'chai' ).expect,
    should = require( 'chai' ).should();


var helpers = require( '../helpers.js' );

var Promise = require( 'bluebird' );


var NullReferenceError = require( '../../src/exception' ).NullReferenceError;


describe( 'mongoose User Controller', function() {
    it( 'should return a Promise', function() {
        controller.getUser().should.be.instanceof( Promise );
    } );
} );