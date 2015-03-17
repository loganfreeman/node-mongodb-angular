var controller = require( '../../src/controller/userController.js' );

var expect = require( 'chai' ).expect,
    should = require( 'chai' ).should();


describe( 'userController', function() {


    describe( '#getUserById', function() {
        it( 'should get user by id', function(done) {
            controller.getUserById( 2 ).
                then( function(user) {
                    console.log( 'userController#getUserById: ' + JSON.stringify( user ) );
                    done();
                }, function(err) {
                        done( err );
                    } );
        } );


        it( 'should get user by email', function(done) {
            controller.getUserByEmail( 'scheng@contactpointsolutions.com' ).
                then( function(user) {
                    console.log( 'userController#getUserByEmail: ' + JSON.stringify( user ) );
                    done();
                }, function(err) {
                        done( err );
                    } );
        } );


        it( 'should get users', function(done) {
            controller.getUsers().
                then( function(users) {
                    users.should.be.instanceof( Array );
                    users[0].should.have.property( 'email' );
                    users[0].should.have.property( 'firstName' );
                    users[0].should.have.property( 'lastName' );
                    users[0].should.have.property( 'name' );
                    done();
                }, function(err) {
                        done( err );
                    } );
        } );

        it( 'should login', function(done) {
            controller.login( 'scheng', 'test' ).
                then( function(user) {
                    user.name.should.be.eq( 'scheng' );
                    user.password.should.be.eq( 'test' );
                    done();
                }, function(err) {
                        done( err );
                    } );
        } );
    } );
} );