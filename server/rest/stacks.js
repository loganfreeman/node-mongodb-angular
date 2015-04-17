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


    it( 'devops should update stack', function(done) {

        var description = 'this is updated through route ' + +new Date();
        var data = {
            instances: ['55241088c8f46e615fe96752']
        };
        var options = {
            url: 'http://localhost:8081/devops/stack/552bfafa8b341e3f03ed9f5a?secret=secret',
            json: data,
            method: 'POST'
        };
        request( options )
            .spread( function(res, body) {
                body.name.should.be.eq( 'production' );


                var instance = _.find( body.instances, function(instance) {
                    return instance._id = '55241088c8f46e615fe96752';
                } );

                instance._id.should.be.eq( '55241088c8f46e615fe96752' );
                done();
            } )
            .catch( function(e) {
                done( e );
            } );

    } );

    it( 'should update stack', function(done) {

        var description = 'this is updated through route ' + +new Date();
        var data = {
            description: description,
            id: 1
        };
        var options = {
            url: 'http://localhost:8081/stack',
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
            environment_id: 1
        };
        var options = {
            method: 'PUT',
            url: 'http://localhost:8081/stack',
            json: instance
        };
        request( options )
            .spread( function(res, body) {
                if (res.statusCode != 200) {
                    throw Error( JSON.stringify( body ) );
                }
                return body;
            } )
            .then( function(stack) {

                stack.name.should.be.eq( 'test' );

                // console.log('TO DELETE: ' + JSON.stringify(deploy));
                var options = {
                    method: 'DELETE',
                    url: 'http://localhost:8081/stack/' + stack.id
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

    it( 'should get stacks and associated instances', function(done) {
        request( 'http://localhost:8081/environment/1/stacks' )
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