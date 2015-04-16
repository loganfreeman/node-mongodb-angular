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
        var thenable = Instance.find( {
            name: 'a'
        } ).exec().then( function(instances) {
            instance = instances.shift();
            //console.log( instance );
            instance.serviceType.should.be.eq( 'PCP' );

            instance.stacks.push( stacks[2]._id );

            instance.stacks.push( stacks[3]._id );


            return instance.save();
        } )
            .then( function(instance) {
                console.log( instance );
                return Stack.find( {
                    _id: {
                        $in: instance.stacks
                    }
                } ).exec();
            } )
            .then( function(models) {
                console.log( models );

                _.each( models, function(stack) {
                    utils.exists( stack.instances, instance._id ).should.be.eq( true );
                } );



                return instance.save();
            } );


        Promise.resolve( thenable ).then( function() {
            done();
        } )
            .catch( function(err) {
                done( err );
            } );
    } );

    it( 'should create instance', function(done) {
        var instance;
        var thenable = Instance.find( {
            name: 'a'
        } ).exec().then( function(instances) {
            instance = instances.shift();
            //console.log( instance );
            instance.serviceType.should.be.eq( 'PCP' );

            instance.stacks.push( stacks[0]._id );

            instance.stacks.push( stacks[1]._id );


            return instance.save();
        } )
            .then( function(instance) {
                console.log( instance );
                return Stack.find( {
                    _id: {
                        $in: instance.stacks
                    }
                } ).exec();
            } )
            .then( function(models) {
                console.log( models );

                _.each( models, function(stack) {
                    utils.exists( stack.instances, instance._id ).should.be.eq( true );
                } );



                return instance.save();
            } );


        Promise.resolve( thenable ).then( function() {
            done();
        } )
            .catch( function(err) {
                done( err );
            } );
    } );



} );