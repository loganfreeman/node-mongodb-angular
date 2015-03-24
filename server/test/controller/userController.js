/**
 *
 *
 * @author scheng
 */


var controller = require( '../../src/controller/userController.js' );

var db = require( '../../src/jugglingdb/init.js' );


var _ = require( 'lodash' );

var expect = require( 'chai' ).expect,
    should = require( 'chai' ).should();


describe( 'userController', function() {


    describe( '#getUserById', function() {
        it( 'should get user by id', function(done) {
            controller.getUserById( 2 ).
                then( function(user) {
                    console.log( 'userController#getUserById: ' + JSON.stringify( user ) );
                    user.should.have.property( 'groups' );
                    user.groups.should.be.instanceof( Array );
                    user.groups.length.should.be.eq( 2 );
                    _.each( user.groups, function(group) {
                        group.should.be.instanceof( db['groups'] );
                    } );
                    done();
                }, function(err) {
                        done( err );
                    } );
        } );


        it( 'should get user by email', function(done) {
            controller.getUserByEmail( 'scheng@contactpointsolutions.com' ).
                then( function(user) {
                    //console.log( 'userController#getUserByEmail: ' + JSON.stringify( user ) );
                    user.should.be.instanceof( db['users'] );
                    user.should.have.property( 'groups' );
                    user.should.have.property( 'email' );
                    done();
                }, function(err) {
                        done( err );
                    } );
        } );


        it( 'should get users', function(done) {
            controller.getUsers().
                then( function(users) {
                    users.should.be.instanceof( Array );

                    _.each( users, function(user) {
                        user.should.be.instanceof( db['users'] );
                        user.should.have.property( 'email' );
                        user.should.have.property( 'firstName' );
                        user.should.have.property( 'lastName' );
                        user.should.have.property( 'name' );
                        user.should.have.property( 'groups' );
                        user.groups.should.be.instanceof( Array );
                    } );
                    done();
                }, function(err) {
                        done( err );
                    } );
        } );

        it( 'should login', function(done) {
            controller.login( 'scheng', '@33yyy' ).
                then( function(user) {
                    user.name.should.be.eq( 'scheng' );
                    user.password.should.be.eq( '$2a$10$eczSQhaHISNuoKsH080P4.SJe0VoY1ucybcSiW/Ny.2FPD2zHfYyO' );
                    user.should.have.property( 'groups' );
                    done();
                }, function(err) {
                        done( err );
                    } );
        } );


        it( 'should login for another user', function(done) {
            controller.login( 'ccastillo', 'hell$66' ).
                then( function(user) {
                    user.name.should.be.eq( 'ccastillo' );
                    user.email.should.be.eq( 'ccastillo@contactpointsolutions.com' );
                    user.should.have.property( 'token' );
                    done();
                }, function(err) {
                        done( err );
                    } );
        } );

        it( 'should throw a duplicate key exception', function(done) {
            var user = {
                firstName: 'jelly',
                lastName: 'bean',
                name: 'jelly.bean',
                email: 'jelly.bean@contactpointsolutions.com',
                password: 'pass22'
            };
            controller.create( user )
                .then( function(user) {
                    done( 'should not create user with duplicate email' );
                }, function(err) {
                        /*

{ [error: duplicate key value violates unique constraint "users_lower_idx"]
  name: 'error',
  length: 228,
  severity: 'ERROR',
  code: '23505',
  detail: 'Key (lower(email))=(jelly.bean@contactpointsolutions.com) already exists.',
  hint: undefined,
  position: undefined,
  internalPosition: undefined,
  internalQuery: undefined,
  where: undefined,
  file: 'nbtinsert.c',
  line: '406',
  routine: '_bt_check_unique' }

                        */
                        err.should.be.instanceof( Object );
                        console.log( err );
                        err.should.have.property( 'code' );
                        err.code.should.be.eq( '23505' );
                        err.detail.should.match( /Key .* already exists/ );
                        done();
                    } );
        } );

        it( 'should delete user after creating it', function(done) {
            var user = {
                firstName: 'jelly',
                lastName: 'bean',
                name: 'jelly.bean',
                email: 'peter.pan@wonderland.com',
                password: 'pass22'
            };
            controller.create( user )
                .then( function(user) {
                    user.email.should.be.eq( 'peter.pan@wonderland.com' );
                    user.should.have.property( 'id' );
                    return controller.delete( user.id );
                } )
                .then( function(user) {
                    done();
                } )
                .catch( function(e) {
                    done( e );
                } );
        } );


        it( 'should destroy model', function(done) {
            var user = {
                firstName: 'test',
                lastName: 'test',
                name: 'test.test',
                email: 'test@contactpointsolutions.com',
                password: 'pass22'
            };
            controller.create( user )
                .then( function(user) {
                    user.email.should.be.eq( 'test@contactpointsolutions.com' );
                    user.should.be.instanceof( db['users'] );
                    controller.destroy( user ).
                        then( function(model) {
                            user.email.should.be.eq( 'test@contactpointsolutions.com' );
                            done();
                        }, function(err) {
                                done( err );
                            } );
                }, function(err) {


                        done( err );
                    } );
        } );

        it( 'should update model', function(done) {
            var user = new db['users'];
            user.id = 2;
            user.firstName = 'Jackie';
            user.lastName = 'Chen';
            user.name = 'scheng';
            user.email = 'scheng@contactpointsolutions.com';
            user.password = '$2a$10$eczSQhaHISNuoKsH080P4.SJe0VoY1ucybcSiW/Ny.2FPD2zHfYyO';
            controller.save(user)
                .then( function(user) {
                    user.should.be.instanceof( db['users'] );
                    user.firstName.should.be.eq( 'Jackie' );
                    user.lastName.should.be.eq( 'Chen' );
                    done();
                }, function(err) {
                        done( err );
                    } );

        } );


        it( 'should update attributes', function(done) {
            var user = new db['users'];
            user.id = 4;
            var attrs = {
                email: 'jelly-bean@example.com',
                name: 'jelly bean',
                firstName: 'jelly',
                lastName: 'beam',
                password: '$2a$10$PHEh7P0EtzeVmlFFO50YruUGqMXhQv.VqptuGp/YsB06y3bQtMNl2'
            };
            controller.update(user, attrs)
                .then( function(user) {
                    user.should.be.instanceof( db['users'] );
                    user.email.should.be.eq( 'jelly-bean@example.com' );
                    user.name.should.be.eq( 'jelly bean' );
                    user.password.should.be.eq( '$2a$10$PHEh7P0EtzeVmlFFO50YruUGqMXhQv.VqptuGp/YsB06y3bQtMNl2' );
                    done();
                }, function(err) {
                        done( err );
                    } );

        } );

    } );
} );