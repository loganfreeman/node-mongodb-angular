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

        var instanceP1 = Instance.create( {
            name: 'a',
            serviceType: 'PCP'
        } );
        var instanceP2 = Instance.create( {
            name: 'b',
            serviceType: 'PCP'
        } );

        var envId, stack;

        Promise.all( [stackPromise, stackPromise1, stackPromise2, stackPromise3, instanceP1, instanceP2] )
            .then( function(values) {

                stacks.push( values.shift() );
                stacks.push( values.shift() );
                stacks.push( values.shift() );
                stacks.push( values.shift() );
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

    it( 'should create instance', function(done) {
        var instance;
        var thenable = Promise.resolve( Instance.findOne( {
            name: 'a'
        } ).exec() )
            .then( function(instance) {
                //console.log( instance );
                instance.serviceType.should.be.eq( 'PCP' );

                var promises = [];

                promises.push( instance.update( {
                    $addToSet: {
                        stacks: {
                            $each: stacks
                        }
                    }
                } ) );

                _.map( stacks, function(stack) {
                    promises.push( stack.update( {
                        $addToSet: {
                            instances: instance
                        }
                    } ) );
                } );


                return Promise.all( promises );
            } )
            .then( function(results) {
                return Instance.findOne( {
                    name: 'a'
                } ).exec();
            } )
            .then( function(instance) {
                console.log( instance );
                return Stack.find( {
                    _id: {
                        $in: instance.stacks
                    }
                } ).exec();
            } )
            .then( function(stacks) {
                console.log( stacks );

                _.each( stacks, function(stack) {
                    stack.instances.length.should.be.eq( 1 );
                } );
            } );

        Promise.resolve( thenable ).then( function() {
            done();
        } )
            .catch( function(err) {
                done( err );
            } );
    } );



} );