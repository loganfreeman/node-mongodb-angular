/**
 * Module dependencies.
 */

var _ = require( 'lodash' );

var expect = require( 'chai' ).expect,
    should = require( 'chai' ).should();

var mongoose = require( 'mongoose' );


require( '../../src/mongoose/models' );

var Promise = require( 'bluebird' );

var R = require( 'ramda' );



/**
 * Mongoose connection helper.
 */

function connect(database) {
    return mongoose.createConnection( 'mongodb://localhost/' + database );
}


describe( '#groups schema#', function() {

    this.timeout( 5000 );
    var db, User, Group, Stack, Instance;

    var sample = {
        firstname: 'Roland',
        lastname: 'black',
        password: 'electronic',
        username: 'test',
        email: 'barray@cctv.com'
    };

    var sample1 = {
        firstname: 'Roland',
        lastname: 'black',
        password: 'electronic',
        username: 'test1',
        email: 'barray1@cctv.com'
    };

    before( function(done) {
        // add dummy data
        db = connect( 'test' );
        User = db.model( 'User' );
        Group = db.model( 'Group' );
        Stack = db.model( 'Stack' );
        Instance = db.model( 'Instance' );

        var group = Group.create( {
            name: 'sample group'
        } );

        var userPromise = User.create( sample );

        var userPromise1 = User.create( sample1 );

        Promise.all( [userPromise, userPromise1, group] )
            .then( function(values) {
                var user = values[0],
                    user1 = values[1],
                    group = values[2];

                user.email.should.be.eq( 'barray@cctv.com' );
                user1.email.should.be.eq( 'barray1@cctv.com' );
                group.name.should.be.eq( 'sample group' );


                var promises = [];
                promises.push( user.update( {
                    $addToSet: {
                        groups: group
                    }
                } ) );

                promises.push( user1.update( {
                    $addToSet: {
                        groups: group
                    }
                } ) );

                promises.push( group.update( {
                    $addToSet: {
                        users: {
                            $each: [user, user1]
                        }
                    }
                } ) );
                return Promise.all( promises );
            } )
            .then( function(result) {
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


    it( 'should add instance and stack to user', function(done) {

        var db, User, Group;
        db = connect( 'devops' );
        User = db.model( 'User' );
        Stack = db.model( 'Stack' );
        Instance = db.model( 'Instance' );


        var promises = [];
        var user = User.findById( '55246784dddb11e7a89c17c7' ).exec();
        var stacks = Stack.find( {
            '_id': {
                $in: ['55240b57bee167e458d8fd17']
            }
        } ).exec();

        var instances = Instance.find( {
            '_id': {
                $in: ['55241088c8f46e615fe96752']
            }
        } ).exec();

        Promise.all( [user, stacks, instances] )
            .then( function(values) {
                console.log( values );
                var user = values[0];
                var stacks = values[1];
                var instances = values[2];
                stacks.length.should.be.eq( 1 );
                instances.length.should.be.eq( 1 );
                if (stacks) {
                    user.stacks = _.uniq( user.stacks.concat( stacks ), function(id) {
                        return id.toString();
                    } );
                }

                if (instances) {
                    user.instances = _.uniq( user.instances.concat( instances ), function(id) {
                        return id.toString();
                    } );
                }

                return user.save();
            } )
            .then( function(user) {
                var hasStack = false,
                    hasInstance = false;
                _.each( user.stacks, function(stack) {
                    if (stack.toString() === '55240b57bee167e458d8fd17') {
                        hasStack = true;
                    }
                } );
                _.each( user.instances, function(instance) {
                    if (instance.toString() === '55241088c8f46e615fe96752') {
                        hasInstance = true;
                    }
                } );

                if (hasStack && hasInstance) {
                    done();
                } else {
                    done( 'Encountered unexpected error' );
                }
            } );
    } );



    it( 'should load by Id', function(done) {
        var groupPromise = Promise.resolve( Group.findOne( {
            name: 'sample group'
        } ).exec() );
        var groupId;
        groupPromise.then( function(group) {
            groupId = group.id;
            Promise.resolve( group.users )
                .map( function(userId) {
                    return User.findById( userId ).exec();
                } )
                .then( function(userPromises) {
                    Promise.all( userPromises )
                        .then( function(users) {
                            /**
                             * all users's groups should be populated
                             */
                            _.each( users, function(user) {
                                user.groups[0].toString().should.be.eq( groupId );
                            } );
                            done();
                        } );
                } );
        } )
            .catch( function(err) {
                done( err );
            } );
    } );


    it( 'should load users by Ids', function(done) {
        var groupPromise = Group.findOne( {
            name: 'sample group'
        } ).exec();
        var groupId;
        groupPromise.then( function(group) {
            groupId = group.id;
            //console.log(group.users);
            return new Promise( function(resolve, reject) {
                    User.find( {
                        '_id': {
                            $in: group.users
                        }
                    }, function(err, users) {
                            group = group.toJSON();
                            group.users = users;
                            resolve( group );
                        } );
                } );
        } )
            .then( function(group) {
                console.log( group );
                done();
            } );
    } );

} );