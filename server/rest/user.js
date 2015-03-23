var Promise = require( 'bluebird' );
var request = Promise.promisify( require( 'request' ) );
// request.debug = true;

var queryString = require( 'querystring' );

var db = require( '../src/jugglingdb/init.js' );


var _ = require( 'lodash' );

var http = require( 'http' );

var helpers = require( '../test/helpers.js' );

var expect = require( 'chai' ).expect,
    should = require( 'chai' ).should();

var assert = require( 'assert' );

describe( 'user route', function() {
    it( 'should return 200', function(done) {
        http.get( helpers.getUrl( '/' ), function(res) {
            assert.equal( 200, res.statusCode );
            done();
        } );
    } );

    it( 'it should login', function(done) {
        var postData = {
            username: 'scheng',
            password: '@33yyy'
        };

        var body = queryString.stringify( postData );

        var options = {
            url: 'http://localhost:8081/login',
            body: body,
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            },
        };

        request( options )
            .spread( function(res, body) {
                console.log( body );
                var user = JSON.parse( body );
                expect( user.email ).to.be.eq( 'scheng@contactpointsolutions.com' );
                done();
            } )
            .catch( function(err) {
                console.log( err );
                done( err );
            } );
    } );
} );