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

        var group3 = Group.create( {
            name: 'group #3'
        } );

        var instance1 = Instance.create( {
            name: 'a',
            serviceType: 'PCP'
        } );

        var instance2 = Instance.create( {
            name: 'b',
            serviceType: 'ETC'
        } );

        var instance3 = Instance.create( {
            name: 'c',
            serviceType: 'ETC'
        } );

        var stack1 = Stack.create( {
            name: 'stack #1'
        } );

        var stack2 = Stack.create( {
            name: 'stack #2'
        } );

        var stack3 = Stack.create( {
            name: 'stack #3'
        } );

        var extraGroup, extraStack, extraInstance;


        Promise.all( [userPromise, group1, group2, instance1, instance2, stack1, stack2, group3, stack3, instance3] )
            .then( function(values) {
                var user = values.shift();

                extraInstance = values.pop();
                extraStack = values.pop();
                extraGroup = values.pop();

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


    it( 'should update user', function(done) {
        var model; // user model

        var data = {
            groups: ['group #3'],
            instances: ['c'],
            stacks: ['stack #3']
        };

        var groupsToAdd, instancesToAdd, stacksToAdd;
        Promise.all(
            [
                Group.find( {
                    name: {
                        $in: data.groups
                    }
                } ).exec(),


                Instance.find( {
                    name: {
                        $in: data.instances
                    }
                } ),

                Stack.find( {
                    name: {
                        $in: data.stacks
                    }
                } )
            ]
            )
            .then( function(values) {
                groupsToAdd = values.shift();
                instancesToAdd = values.shift();
                stacksToAdd = values.shift();

                groupsToAdd.length.should.be.eq( 1 );
                instancesToAdd.length.should.be.eq( 1 );
                stacksToAdd.length.should.be.eq( 1 );

                return User.findOne( {
                    email: 'barray@cctv.com'
                } ).exec();
            } )
            .then( function(user) {

                var updates = [];
                var instances = _.filter( user.instances, function(model) {
                    return !_.contains( data.instances, model.name );
                } );
                console.log( instances );

                var groups = _.filter( user.groups, function(model) {
                    return !_.contains( data.groups, model.name );
                } );
                console.log( groups );

                var stacks = _.filter( user.stacks, function(model) {
                    return !_.contains( data.stacks, model.name );
                } );
                console.log( stacks );

                // update all
                updates.push( user.update( {
                    $pullAll: {
                        stacks: stacks,
                        groups: groups,
                        instances: instances
                    }

                } ) );

                updates.push( user.update( {
                    $addToSet: {
                        instances: {
                            $each: instancesToAdd
                        },
                        stacks: {
                            $each: stacksToAdd
                        },
                        groups: {
                            $each: groupsToAdd
                        }
                    }
                } ) );
                return Promise.all( updates );
            } )
            .then( function(results) {
                console.log( results );
                return Promise.resolve( User.findOne( {
                    email: 'barray@cctv.com'
                } ).exec() );
            } )
            .then( function(user) {
                user.instances.length.should.be.eq( 1 );
                user.groups.length.should.be.eq( 1 );
                user.stacks.length.should.be.eq( 1 );
                return user.update( {
                    $set: {
                        'groups': [],
                        'stacks': [],
                        'instances': [],
                        'username': 'test'
                    }
                }, {
                        multi: true
                    } );
            } )
            .then( function() {
                return Promise.resolve( User.findOne( {
                    email: 'barray@cctv.com'
                } ).exec() );
            } )
            .then( function(user) {
                user.instances.length.should.be.eq( 0 );
                user.groups.length.should.be.eq( 0 );
                user.stacks.length.should.be.eq( 0 );
                user.username.should.be.eq( 'test' );
                done();
            } );
    } );







} );