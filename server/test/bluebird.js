var Promise = require( 'bluebird' );


var request = Promise.promisify( require( 'request' ) );

var db = require( '../src/jugglingdb/init.js' );


var errors = require( '../src/exception' );


var userController = require( '../src/controller/userController.js' );


var groupController = require( '../src/controller/groupController.js' );

var config = require( '../src/config/config.js' );

var port = config.getPort();

var protocol = config.getProtocol();

var url = require( 'url' );

var NullReferenceError = require( '../src/exception' ).NullReferenceError;


var join = Promise.join;
var fs = Promise.promisifyAll( require( 'fs' ) );

var helpers = require( './helpers.js' );

var _ = require( 'lodash' );

var expect = require( 'chai' ).expect,
    AssertionError = require( 'chai' ).AssertionError,
    should = require( 'chai' ).should();

describe( 'bluebird', function() {


    describe( 'steps', function() {
        it( 'should exit on zero', function(done) {
            Promise.resolve( 1 )
                .then( function(v) {
                    v = v - 1;
                    v.should.not.be.eq( 0 );
                    return v;
                } )
                .then( function(v) {
                    return v = 1 / v;
                } )
                .then( function(v) {
                    v.should.not.be.eq( Infinity );
                    done();
                } )
                .catch( AssertionError, function(e) {
                    done();
                } )
                .catch( function(e) {
                    done( e );
                } );
        } );

        it( 'should exit on null reference', function(done) {
            Promise.resolve( null )
                .then( function(o) {
                    return o.toString();
                } )
                .catch( function(e) {
                    return (e instanceof TypeError);
                }, function(e) {
                        done();
                    } )
                .catch( function(e) {
                    done( e );
                } );

        } );

        it( 'should exit on null reference', function(done) {
            Promise.resolve( null )
                .then( function(o) {
                    if (!o)
                        throw NullReferenceError();
                    return o.toString();
                } )
                .catch( NullReferenceError, function(e) {
                    done();
                } )
                .catch( function(e) {
                    done( e );
                } );

        } );
    } );

    describe( 'extend', function() {
        it( 'should assign', function() {
            var user = new db['users'];
            user.firstName = 'John';
            user.lastName = 'Wall';


            _.assign( user, {
                firstName: 'Peter',
                lastName: 'Jackson'
            } );

            user.firstName.should.be.eq( 'Peter' );
            user.lastName.should.be.eq( 'Jackson' );
        } );
    } );


    describe( 'map', function() {
        it( 'should resolve as array', function(done) {
            fs.readdirAsync( '.' ).map( function(fileName) {
                var stat = fs.statAsync( fileName );
                var contents = fs.readFileAsync( fileName ).catch( function ignore() {} );
                return join( stat, contents, function(stat, contents) {
                    return {
                        stat: stat,
                        fileName: fileName,
                        contents: contents
                    };
                } );
                // The return value of .map is a promise that is fulfilled with an array of the mapped values
                // That means we only get here after all the files have been statted and their contents read
                // into memory. If you need to do more operations per file, they should be chained in the map
                // callback for concurrency.
            } ).call( 'sort', function(a, b) {
                return a.fileName.localeCompare( b.fileName );
            } ).then( function(results) {
                results.should.be.instanceof( Array );
                _.each( results, function(result) {
                    result.should.have.property( 'stat' );
                    result.should.have.property( 'fileName' );
                    result.should.have.property( 'contents' );
                } );
                done();
            } ).catch( function(e) {
                done( e );
            } );
        } );

        it( 'should return user with group list', function(done) {

            var user = new db['users'];
            user.id = 2;

            var promise = Promise.resolve( user );


            promise.then( function(user) {
                return groupController.getGroupsByUserId( user.id );
            } )
                .map( function(userGroup) {
                    return userGroup.group_id;
                } ).then( function(groupIdList) {
                return groupController.getGroupList( groupIdList );
            } ).then( function(groups) {
                user.groups = groups;
                groups.should.be.instanceof( Array );
                _.each( groups, function(group) {
                    group.should.be.instanceof( db['groups'] );
                } );
                done();
            } ).catch( function(e) {
                done( e );
            } );
        } );

        it( 'should return attach group to user', function(done) {

            var user = new db['users'];
            user.id = 2;


            userController.attachGroup(user)
                .then( function(user) {
                    user.should.have.property( 'groups' );
                    user.groups.should.be.instanceof( Array );
                    _.each( user.groups, function(group) {
                        group.should.be.instanceof( db['groups'] );
                    } );
                    done();
                } ).catch( function(e) {
                done( e );
            } );


        } );
    } );


    describe( 'userController', function() {
        it( 'should get user by id', function(done) {
            userController.getUserById( 2 ).then( function(user) {
                console.log( 'Promise resolved:' + JSON.stringify( user ) );
                done();
            }, function(err) {
                    done( err );
                } );
        } );
    } );
    it( 'should return promise', function(done) {

        Promise.resolve( request( 'http://www.google.com' ) )
            .then( function(result) {
                done();
            }, function(err) {
                    done( err );
                } );
    } );


    it( 'should return user in promise', function(done) {


        Promise.resolve()
            .then( function(model) {
                //model.should.have.property( 'name' );
                done();
            }, function(err) {
                    done( err );
                } );
    } );

    it( 'should catch custom error', function() {

        var error = new errors.ClientError( 'name required' );

        var promise = new Promise( function(resolve, reject) {
            throw error;
        } );

        promise.catch( errors.ClientError, function(e) {
            e.should.be.instanceof( errors.ClientError );
        } );



    } );


    it( 'should construct url', function() {
        var params = {
            name: 'scheng',
            username: 'scheng',
            email: 'scheng@logmycalls.com'
        };

        var urlStr = url.format( {
            host: 'localhost',
            protocol: protocol,
            port: port,
            pathname: 'login',
            query: params
        } );

        console.log( ('' + urlStr).magenta );

        var expected = 'http://localhost/login?name=scheng&username=scheng&email=scheng%40logmycalls.com';

        urlStr.should.be.eq( expected );

    } );

    describe( 'helpers', function() {
        it( 'should construct url with params', function() {
            var expected = 'http://localhost:8081/login?name=scheng&username=scheng&email=scheng%40logmycalls.com';
            var params = {
                name: 'scheng',
                username: 'scheng',
                email: 'scheng@logmycalls.com'
            };
            var path = 'login';
            var formatted = helpers.getUrl( path, params );

            formatted.should.be.eq( expected );
        } );

        it( 'should construct url without params', function() {
            var expected = 'http://localhost:8081/login';

            var path = 'login';
            var formatted = helpers.getUrl( path );

            formatted.should.be.eq( expected );
        } );
    } );


} );