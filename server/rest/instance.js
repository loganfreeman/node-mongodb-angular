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

describe( 'instance routes', function() {

    it( 'should get instances by stack ID', function(done) {
        request( 'http://localhost:8081/instances/stack/1' )
            .spread( function(res, instances) {
                var instances = JSON.parse( instances );
                instances[0].should.have.property( 'ip' );
                done();
            } )
            .catch( function(e) {
                done( e );
            } );
    } );

    it( 'should update instance', function(done) {

        var description = 'this is updated through route ' + +new Date();
        var data = {
            description: description,
            id: 1
        };
        var options = {
            url: 'http://localhost:8081/instance',
            json: data,
            method: 'POST'
        };
        request( options )
            .spread( function(res, body) {
                body.description.should.be.eq( description );
                done();
            } )
            .catch( function(e) {
                done( e );
            } );

    } );

    it( 'should create then delete', function(done) {
        var instance = {
            name: 'test',
            description: 'this is inserted by test',
            stack_id: 1,
            ip: '192.168.100.128/25'
        };
        var options = {
            method: 'PUT',
            url: 'http://localhost:8081/instance',
            json: instance
        };
        request( options )
            .spread( function(res, body) {
                if (res.statusCode != 200) {
                    throw Error( JSON.stringify( body ) );
                }
                return body;
            } )
            .then( function(instance) {

                instance.name.should.be.eq( 'test' );
                instance.ip.should.be.eq( '192.168.100.128/25' );

                // console.log('TO DELETE: ' + JSON.stringify(deploy));
                var options = {
                    method: 'DELETE',
                    url: 'http://localhost:8081/instance/' + instance.id
                };
                request( options ).
                    spread( function(res, body) {
                        done();
                    } )
                    .catch( function(err) {
                        done( err );
                    } );
            } )
            .catch( function(err) {
                done( err );
            } );
    } );


} );