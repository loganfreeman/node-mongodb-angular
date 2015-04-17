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


    it( 'devops should create then delete', function(done) {
        var instance = {
            name: 'Ghost',
            description: 'this is created by groups route'
        };
        var options = {
            method: 'PUT',
            url: 'http://localhost:8081/devops/group?secret=secret',
            json: instance
        };
        request( options )
            .spread( function(res, body) {
                if (res.statusCode != 200) {
                    throw Error( JSON.stringify( body ) );
                }
                return body;
            } )
            .then( function(group) {

                // console.log('TO DELETE: ' + JSON.stringify(deploy));
                group.name.should.be.eq( 'Ghost' );
                var options = {
                    method: 'DELETE',
                    url: 'http://localhost:8081/devops/group/' + group._id + '?secret=secret'
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

    it( 'should create then delete', function(done) {
        var instance = {
            name: 'Ghost',
            description: 'this is created by groups route'
        };
        var options = {
            method: 'PUT',
            url: 'http://localhost:8081/group',
            json: instance
        };
        request( options )
            .spread( function(res, body) {
                if (res.statusCode != 200) {
                    throw Error( JSON.stringify( body ) );
                }
                return body;
            } )
            .then( function(group) {

                // console.log('TO DELETE: ' + JSON.stringify(deploy));
                var options = {
                    method: 'DELETE',
                    url: 'http://localhost:8081/group/' + group.id
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

    it( 'should update group', function(done) {

        var description = 'this is updated through route ' + +new Date();
        var data = {
            description: description,
            id: 2
        };
        var options = {
            url: 'http://localhost:8081/group',
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


    it( 'devops should add user to group', function(done) {
        var options = {
            url: 'http://localhost:8081/devops/group/5531447068181b6da22be1d1/user?secret=secret',
            method: 'POST',
            json: {
                userId: '55246784dddb11e7a89c17c7'
            }
        };

        request( options )
            .spread( function(res, body) {
                return request( 'http://localhost:8081/devops/group?secret=secret' );
            } )
            .spread( function(res, body) {
                body = JSON.parse( body );
                var group = _.find( body, function(group) {
                    return group.name == 'test';
                } );

                var user = _.find( group.users, function(user) {
                    return user._id = '55246784dddb11e7a89c17c7';
                } );

                user._id.should.be.eq( '55246784dddb11e7a89c17c7' );
                done();
            } )
            .catch( function(e) {
                done( e );
            } );
    } );
} );