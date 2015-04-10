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

var UserNotFoundError = require( '../src/exception' ).UserNotFoundError;


describe( 'user route', function() {

    it( 'should not create admin user', function(done) {
        var postData = {
            email: 'test@fox.com',
            password: '@xxx',
            firstname: 'john',
            lastname: 'doe',
            username: 'john.doe',
            secret: 'exx'
        };

        var body = queryString.stringify( postData );

        var options = {
            url: 'http://localhost:8081/auth/admin/users',
            body: body,
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            },
        };

        request( options )
            .spread( function(res, body) {
                //console.log( res );
                //body.errors.password.type.should.be.eq( 'Password is incorrect.' );
                //var user = JSON.parse( body );
                //expect( user.email ).to.be.eq( 'scheng@contactpointsolutions.com' );
                console.log( res.statusCode );
                res.statusCode.should.be.eq( 401 );
                done();
            } )
            .catch( function(err) {
                console.log( err );
                done( err );
            } );
    } );


    it( 'should create admin user', function(done) {
        var postData = {
            email: 'test@fox.com',
            password: '@xxx',
            firstname: 'john',
            lastname: 'doe',
            username: 'john.doe',
            secret: 'dfd11212&6300000-)((()))'
        };

        var body = queryString.stringify( postData );

        var options = {
            url: 'http://localhost:8081/auth/admin/users',
            body: body,
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            },
        };

        request( options )
            .spread( function(res, body) {
                //console.log( res );
                //body.errors.password.type.should.be.eq( 'Password is incorrect.' );
                //var user = JSON.parse( body );
                //expect( user.email ).to.be.eq( 'scheng@contactpointsolutions.com' );
                res.statusCode.should.be.eq( 200 );

                return JSON.parse( body );
            } )
            .then( function(user) {

                user.should.have.property( '_id' );
                user.email.should.be.eq( 'test@fox.com' );
                user.fullname.should.be.eq( 'john doe' );
                user.type.should.be.eq( 'Administrator' );
                var options = {
                    url: 'http://localhost:8081/auth/user/' + user._id,
                    method: 'DELETE'
                };

                request( options )
                    .spread( function(res, body) {
                        console.log( body );
                        done();
                    } );
            } )
            .catch( function(e) {
                done( e );
            } );
    } );

    it( 'should not login', function(done) {
        var postData = {
            email: 'scheng@contactpointsolutions.com',
            password: '@xxx'
        };

        var body = queryString.stringify( postData );

        var options = {
            url: 'http://localhost:8081/auth/session',
            body: body,
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            },
        };

        request( options )
            .spread( function(res, body) {
                //console.log( res );
                //body.errors.password.type.should.be.eq( 'Password is incorrect.' );
                //var user = JSON.parse( body );
                //expect( user.email ).to.be.eq( 'scheng@contactpointsolutions.com' );
                var body = JSON.parse( body );
                console.log( body.errors );
                body.errors.password.type.should.be.eq( 'Password is incorrect.' );
                done();
            } )
            .catch( function(err) {
                console.log( err );
                done( err );
            } );
    } );


    it( 'should login', function(done) {
        var postData = {
            email: 'scheng@contactpointsolutions.com',
            password: '@33yyy'
        };

        var body = queryString.stringify( postData );

        var options = {
            url: 'http://localhost:8081/auth/session',
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
                user.username.should.be.eq( 'scheng' );
                user.groups.length.should.be.gt( 0 );
                user.groups[0].should.be.eq( '5522ee7d58292c77df437792' );
                user.type.should.be.eq( 'User' );
                //var user = JSON.parse( body );
                //expect( user.email ).to.be.eq( 'scheng@contactpointsolutions.com' );
                done();
            } )
            .catch( function(err) {
                console.log( err );
                done( err );
            } );
    } );

    it( 'should get users by group ID', function(done) {
        request( 'http://localhost:8081/users/group/1' )
            .spread( function(res, users) {
                var users = JSON.parse( users );
                users[0].should.have.property( 'email' );
                users[0].should.have.property( 'groups' );
                done();
            } )
            .catch( function(e) {
                done( e );
            } );
    } );


    it( 'should update user', function(done) {
        var user = {
            id: 2,
            firstName: 'shanhong',
            lastName: 'cheng'
        };
        var options = {
            url: 'http://localhost:8081/user/' + user.id,
            method: 'POST',
            json: user
        };
        request( options )
            .spread( function(res, body) {
                body.firstName.should.be.eq( 'shanhong' );
                body.lastName.should.be.eq( 'cheng' );
                done();
            } )
            .catch( function(e) {
                done( e );
            } );
    } );
    it( 'should return 200', function(done) {
        http.get( helpers.getUrl( '/' ), function(res) {
            assert.equal( 200, res.statusCode );
            done();
        } );
    } );


    it( 'it should create user', function(done) {
        var user = {
            firstName: 'jelly',
            lastName: 'bean',
            name: 'jelly.bean',
            email: 'snow.white@mysteryforest.com',
            password: 'pass22'
        };


        var options = {
            url: 'http://localhost:8081/user',
            method: 'PUT',
            json: user
        };

        request( options )
            .spread( function(res, body) {
                console.log( body );
                return body;
            } )
            .then( function(user) {

                user.should.have.property( 'id' );
                var options = {
                    url: 'http://localhost:8081/user/' + user.id,
                    method: 'DELETE'
                };

                request( options )
                    .spread( function(res, body) {
                        done();
                    } );
            } )
            .catch( function(e) {
                done( e );
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