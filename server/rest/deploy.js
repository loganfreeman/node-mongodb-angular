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

describe( 'deploy routes', function() {

    it( 'should update deploy', function(done) {

        var comments = 'this is updated through route ' + +new Date();
        var data = {
            comments: comments,
            id: 2
        };
        var options = {
            url: 'http://localhost:8081/deploy',
            json: data,
            method: 'POST'
        };
        request( options )
            .spread( function(res, body) {
                body.comments.should.be.eq( comments );
                done();
            } )
            .catch( function(e) {
                done( e );
            } );

    } );


    it( 'devops should update deploy', function(done) {

        var comments = 'this is updated through route ' + +new Date();
        var data = {
            instance: '55241088c8f46e615fe96752',
            user: '55246784dddb11e7a89c17c7'
        };
        var options = {
            url: 'http://localhost:8081/devops/deploy/5524155b66a6df5f65d60e18?secret=secret',
            json: data,
            method: 'POST'
        };
        request( options )
            .spread( function(res, body) {
                body.comments.should.be.eq( 'this is a test deploy' );
                body.instance.name.should.be.eq( 'test' );
                body.instance.deploys.should.contains( body._id );
                body.user._id.should.be.eq( '55246784dddb11e7a89c17c7' );
                done();
            } )
            .catch( function(e) {
                done( e );
            } );

    } );


    it( 'should get deploys', function(done) {
        request( 'http://localhost:8081/deploys' )
            .spread( function(res, deploys) {
                var deploys = JSON.parse( deploys );
                _.each( deploys, function(instance) {
                    instance.should.have.property( 'instance_id' );
                } );
                done();
            } )
            .catch( function(err) {
                done( err );
            } );
    } );

    it( 'should get deploys by instance ID', function(done) {
        request( 'http://localhost:8081/deploys/instance/1' )
            .spread( function(res, deploys) {
                var deploys = JSON.parse( deploys );
                _.each( deploys, function(instance) {
                    instance.should.have.property( 'instance_id' );
                } );
                done();
            } )
            .catch( function(err) {
                done( err );
            } );
    } );


    it( 'should create then delete', function(done) {
        var instance = {
            deploy_date: new Date,
            user_id: 2,
            instance_id: 1,
            comments: 'this is inserted by test'
        };
        var options = {
            method: 'PUT',
            url: 'http://localhost:8081/deploy',
            json: instance
        };
        request(options)
            .spread( function(res, body) {
                if (res.statusCode != 200) {
                    throw Error( JSON.stringify( body ) );
                }
                return body;
            } )
            .then( function(deploy) {

                // console.log('TO DELETE: ' + JSON.stringify(deploy));
                var options = {
                    method: 'DELETE',
                    url: 'http://localhost:8081/deploy/' + deploy.id
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