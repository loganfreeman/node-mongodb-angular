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

var uuid = require( 'node-uuid' );

describe( 'stack routes', function() {
    it( 'should get stacks and associated instances', function(done) {
        request( 'http://localhost:8081/stacks' )
            .spread( function(res, body) {
                var stacks = JSON.parse( body );
                stacks.should.be.instanceof( Array );
                _.each( stacks, function(stack) {
                    stack.should.have.property( 'instances' );
                    stack.instances.should.be.instanceof( Array );
                } );
                done();
            } );
    } );
} );