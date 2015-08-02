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


    var instances, stacks;


    before( function(done) {
        // add dummy data
        db = connect( 'test' );
        User = db.model( 'User' );
        Group = db.model( 'Group' );
        Stack = db.model( 'Stack' );
        Instance = db.model( 'Instance' );



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


        Promise.all( [instance1, instance2, instance3, stack1, stack2, stack3] )
            .then( function(values) {



                instances = values.slice( 0, 3 );

                stacks = values.slice( 3 );

                var stack = values.pop();


                return stack.update( {
                    $addToSet: {

                        instances: {
                            $each: instances
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


    it( 'should run', function(done) {

        var insIds = _.map( instances, function(ins) {
            return ins._id.toString();
        } );

        var insIdsToUpdate = insIds.slice( 0, 2 );

        Promise.resolve( Stack.findOne( {
            name: 'stack #3'
        } ).exec() )
            .then( function(stack) {
                stack.instances.length.should.be.eq( 3 );
                var promises = [];


                var instancesToDelete = [];

                if (insIdsToUpdate.length) {
                    instancesToDelete = _.filter( stack.instances, function(model) {
                        return !_.contains( insIdsToUpdate, model.toString() );
                    } );
                    promises.push( stack.update( {
                        $pullAll: {
                            instances: instancesToDelete
                        }
                    } ) );
                    promises.push( stack.update( {
                        $addToSet: {
                            instances: {
                                $each: insIdsToUpdate
                            }
                        }
                    } ) );
                } else {
                    // set instances to []
                    promises.push( stack.update( {
                        $set: {
                            'instances': []
                        }
                    }, {
                            multi: true
                        } ) );
                }

                return Promise.all( promises );
            } )
            .then( function(results) {
                return Stack.findOne( {
                    name: 'stack #3'
                } ).exec();
            } )
            .then( function(stack) {
                stack.instances.length.should.be.eq( 2 );
                return Instance.find( {
                    _id: {
                        $in: stack.instances
                    }
                } ).exec();

            } )
            .then( function(instances) {
                instances.length.should.be.eq( 2 );
                var filtered = _.filter( instances, function(ins) {
                    return ins.name === 'c';
                } );
                filtered.length.should.be.eq( 0 );
                done();
            } )
            .catch( function(err) {
                done( err );
            } );
    } );














} );