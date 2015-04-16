/**
 * Module dependencies.
 */

var _ = require( 'lodash' );

var expect = require( 'chai' ).expect,
    should = require( 'chai' ).should();

var mongoose = require( 'mongoose' );


require( '../../src/mongoose/models' );

var Promise = require( 'bluebird' );

var _ = require( 'lodash' );

var NullReferenceError = require( '../../src/exception' ).NullReferenceError;

var CastError = mongoose.Error.CastError;



/**
 * Mongoose connection helper.
 */

function connect(database) {
    return mongoose.createConnection( 'mongodb://localhost/' + database );
}


describe( 'user schema', function() {

    this.timeout( 5000 );
    var db, User, Group, Stack, Instance;

    var sample = {
        firstname: 'Roland',
        lastname: 'black',
        password: 'electronic',
        username: 'test',
        email: 'barray@cctv.com'
    };

    before( function(done) {
        // add dummy data
        db = connect( 'test' );
        User = db.model( 'User' );
        Group = db.model( 'Group' );
        Stack = db.model( 'Stack' );
        Instance = db.model( 'Instance' );

        var userPromise = User.create( sample );

        var group1 = Group.create( {
            name: 'group #1'
        } );
        var group2 = Group.create( {
            name: 'group #2'
        } );

        var instance1 = Instance.create( {
            name: 'a',
            serviceType: 'PCP'
        } );

        var instance2 = Instance.create( {
            name: 'b',
            serviceType: 'ETC'
        } );

        var stackPromise1 = Stack.create( {
            name: 'stack #2'
        } );

        var stackPromise2 = Stack.create( {
            name: 'stack #3'
        } );


        Promise.all( [userPromise, group1, group2, instance1, instance2, stackPromise1, stackPromise2] )
            .then( function(values) {
                var user = values.shift();
                return user.update( {
                    $addToSet: {
                        groups: {
                            $each: values.slice( 0, 2 )
                        },
                        instances: {
                            $each: values.slice( 2, 4 )
                        },
                        stacks: {
                            $each: values.slice( 4 )
                        }
                    }
                } );
            } )
            .then( function(res) {
                res.nModified.should.be.eq( 1 );
                done();
            } )
            .catch( function(err) {
                done( err );
            } );
    } );

    after( function(done) {
        // clean up the test db
        db.db.dropDatabase( function() {
            db.close();
            done();
        } );
    } );



    it( 'should add instances and stacks', function(done) {

        var model; // user model
        Promise.resolve( User.findOne( {
            email: 'barray@cctv.com'
        } ).exec() )
            .then( function(user) {
                model = user;

                user.instances.length.should.be.eq( 2 );
                user.groups.length.should.be.eq( 2 );
                user.stacks.length.should.be.eq( 2 );
                return Promise.resolve( Instance.find( {
                    _id: {
                        $in: user.instances
                    }
                } ).exec() );
            } )
            .then( function(instances) {
                instances.length.should.be.eq( 2 );
                return Promise.resolve( Stack.find( {
                    _id: {
                        $in: model.stacks
                    }
                } ).exec() );
            } )
            .then( function(stacks) {
                stacks.length.should.be.eq( 2 );
                return Promise.resolve( Group.find( {
                    _id: {
                        $in: model.groups
                    }
                } ).exec() );
            } )
            .then( function(groups) {
                groups.length.should.be.eq( 2 );
                done();
            } );
    } );







} );