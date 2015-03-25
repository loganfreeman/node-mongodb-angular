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




describe( 'groups routes', function() {
    it( 'should return groups', function(done) {
        request( 'http://localhost:8081/groups' )
            .spread( function(res, body) {
                var groups = JSON.parse( body );
                groups.should.have.property( 'length' );
                groups.length.should.be.gt( 0 );
                done();
            } )
            .catch( function(e) {
                done( e );
            } );
    } );

    it( 'should add user to group', function(done) {
        var options = {
            url: 'http://localhost:8081/groups/3/53',
            method: 'PUT'
        };

        request( options )
            .spread( function(res, body) {
                var group = JSON.parse( body );
                group.name.should.be.eq( 'test' );
                done();
            } )
            .catch( function(e) {
                done( e );
            } );
    } );
} );