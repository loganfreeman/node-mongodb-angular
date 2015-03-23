var _ = require( 'lodash' );

var expect = require( 'chai' ).expect,
    should = require( 'chai' ).should();


var assert = require( 'assert' );


var helpers = require( '../helpers.js' );

var Promise = require( 'bluebird' );
var request = Promise.promisify( require( 'request' ) );
request.debug = true;

var queryString = require( 'querystring' );

var config = require( '../../src/config/config.js' );

var http = require( 'http' );


describe( 'user routes', function() {
    describe( '#login', function() {

        it( 'should return 200', function() {
            http.get( helpers.getUrl( '/' ), function(res) {
                assert.equal( 200, res.statusCode );
                console.log( res.body );
            } );
        } );

        it( 'should login successfully', function() {

            var postData = {
                username: 'scheng',
                password: '@33yyy'
            };

            var url = helpers.getUrl( 'login' );

            var body = queryString.stringify( postData );

            console.log( ('' + url).magenta );



            var options = {
                url: url,
                body: body,
                method: 'POST',
                headers: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
            };

            request( options )
                .spread( function(res, body) {
                    console.log( body );
                } )
                .catch( function(err) {
                    console.log( err );
                } );





        } );
    } );
} );