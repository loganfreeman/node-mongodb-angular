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


describe( 'environment routes', function() {
    it( 'should return all environments', function(done) {
        request( 'http://localhost:8081/environments' )
            .spread( function(res, body) {
                var environs = JSON.parse( body );
                helpers.isJSONArray( environs );
                done();
            } )
            .catch( function(e) {
                done( e );
            } );
    } );
} );