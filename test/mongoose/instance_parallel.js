var _ = require( 'lodash' );

var expect = require( 'chai' ).expect,
    should = require( 'chai' ).should();

var mongoose = require( 'mongoose' );


require( '../../src/mongoose/models' );

var Promise = require( 'bluebird' );

var utils = require( '../../src/resources/utils.js' );

function connect(database) {
    return mongoose.createConnection( 'mongodb://localhost/' + database );
}


describe( '#instance#', function() {
    var db, Instance, Stack;

    var stacks = [];

    before( function(done) {
        // add dummy data
        db = connect( 'test' );
        Stack = db.model( 'Stack' );
        Instance = db.model( 'Instance' );


        var stackPromise = Stack.create( {
            name: 'stack #1'
        } );

        var stackPromise1 = Stack.create( {
            name: 'stack #2'
        } );

        var stackPromise2 = Stack.create( {
            name: 'stack #3'
        } );

        var stackPromise3 = Stack.create( {
            name: 'stack #4'
        } );

        var instanceA = Instance.create( {
            name: 'a',
            serviceType: 'PCP'
        } );

        var instanceB = Instance.create( {
            name: 'b',
            serviceType: 'PCP'
        } );

        var instanceC = Instance.create( {
            name: 'c',
            serviceType: 'PCP'
        } );

        var instanceD = Instance.create( {
            name: 'd',
            serviceType: 'PCP'
        } );


        var instance1, instance2, stack;

        Promise.all( [stackPromise, stackPromise1, stackPromise2, stackPromise3, instanceA, instanceB, instanceC, instanceD] )
            .then( function(values) {


                var promises = [];

                var stacks = values.slice( 0, 4 );

                var instances = values.slice( 4 );

                _.each( instances, function(instance) {
                    _.each( stacks, function(stack) {
                        instance.stacks.push( stack._id );
                    } );
                    promises.push( instance.save() );
                } );
                return Promise.all( promises );
            } )
            .then( function(values) {
                done();
            } );


    } );

    after( function(done) {
        // clean up the test db
        db.db.dropDatabase( function() {
            db.close();
            done();
        } );
    } );


    it( 'should get stacks of instance', function(done) {
        Instance.find().exec()
            .then( function(instances) {
                _.each( instances, function(instance) {
                    instance.stacks.length.should.be.eq( 4 );
                } );
                done();
            } );
    } );

    it( 'should get instances of stack', function(done) {
        Stack.findOne( {
            name: 'stack #1'
        } ).exec()
            .then( function(stack) {
                stack.name.should.be.eq( 'stack #1' );
                return Instance.find( {
                    stacks: stack._id
                } ).exec();
            } )
            .then( function(instances) {
                instances.length.should.be.eq( 4 );
                _.each( instances, function(instance) {
                    instance.stacks.length.should.be.eq( 4 );
                } );
                done();
            } );
    } );

    it( 'should delete stack from stacks array', function(done) {
        var promises = [];
        promises.push( Instance.findOne( {
            name: 'a'
        } ).exec() );

        var stackId;

        promises.push( Stack.findOne( {
            name: 'stack #4'
        } ).exec() );

        Promise.all( promises )
            .then( function(values) {
                var instance = values.shift();
                var stack = values.shift();
                // save stack ID 
                stackId = stack._id;
                instance.name.should.be.eq( 'a' );
                stack.name.should.be.eq( 'stack #4' );

                // done();
                return instance.update( {
                    $pullAll: {
                        stacks: [stack._id]
                    }
                } );
            } )
            .then( function(result) {
                result.nModified.should.be.eq( 1 );
                //done();
                return Instance.findOne( {
                    name: 'a'
                } ).exec();
            } )
            .then( function(instance) {
                instance.stacks.length.should.be.eq( 3 );
                //console.log( instance );
                return Instance.find( {
                    stacks: stackId
                } ).exec();
            } )
            .then( function(instances) {
                instances.length.should.be.eq( 3 );
                done();
            } );
    } );

    it( 'should add to set', function(done) {
        var promises = [];
        promises.push( Instance.findOne( {
            name: 'b'
        } ).exec() );

        promises.push( Stack.create( {
            name: 'addToSet'
        } ) );

        var saved;

        Promise.all( promises )
            .then( function(values) {
                console.log( values );
                var instance = values.shift();
                var stack = values.shift();
                instance.stacks.length.should.be.eq( 4 );

                saved = stack;

                // instance.stacks.push( stack._id );
                return instance.update( {
                    $addToSet: {
                        stacks: stack._id
                    }
                } );
            } )
            .then( function(result) {
                return Instance.findOne( {
                    name: 'b'
                } ).exec();
            } )
            .then( function(instance) {
                instance.stacks.length.should.be.eq( 5 );
                return Instance.findOne( {
                    name: 'c'
                } ).exec();
            } )
            .then( function(instance) {
                //instance.stacks.push( saved._id );
                return instance.update( {
                    $addToSet: {
                        stacks: saved._id
                    }
                } );
            } )
            .then( function(result) {
                return Instance.findOne( {
                    name: 'c'
                } ).exec();
            } )
            .then( function(instance) {
                instance.stacks.length.should.be.eq( 5 );
                return Stack.findOne( {
                    name: 'addToSet'
                } ).exec();
            } )
            .then( function(stack) {
                return Instance.find( {
                    stacks: stack._id
                } ).exec();
            } )
            .then( function(instances) {
                instances.length.should.be.eq( 2 );
                done();
            } )
            .catch( function(err) {
                done( err );
            } );
    } );










} );