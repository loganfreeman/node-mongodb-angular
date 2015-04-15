var _ = require( 'lodash' );

var expect = require( 'chai' ).expect,
    should = require( 'chai' ).should();

var mongoose = require( 'mongoose' );


require( '../../src/mongoose/models' );

var Promise = require( 'bluebird' );

function connect(database) {
    return mongoose.createConnection( 'mongodb://localhost/' + database );
}


describe( 'stack', function() {

    var db, Instance, Stack;

    before( function(done) {
        // add dummy data
        db = connect( 'test' );
        Stack = db.model( 'Stack' );
        Instance = db.model( 'Instance' );


        var stackPromise = Stack.create( {
            name: 'stack #1'
        } );

        var instanceP1 = Instance.create( {
            name: 'a'
        } );
        var instanceP2 = Instance.create( {
            name: 'b'
        } );

        var envId, stack;

        Promise.all( [stackPromise, instanceP1, instanceP2] )
            .then( function(values) {
                stack = values.shift();
                _.each( values, function(instance) {
                    stack.instances.push( instance );
                } );
                return stack.save();
            } )
            .then( function(stack) {
                console.log( stack );
                return Instance.find( {
                    name: {
                        $in: ['a', 'b']
                    }
                } ).exec();
            } )
            .then( function(instances) {
                _.each( instances, function(instance) {
                    instance.stacks[0].toString().should.be.eq( stack._id.toString() );
                } );
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






    it( 'should find stacks by Ids', function(done) {


        var db = connect( 'devops' );
        var Stack = db.model( 'Stack' );

        Stack.find( {
            '_id': {
                $in: ['55240b57bee167e458d8fd17']
            }
        } ).exec()
            .then( function(stacks) {
                stacks.length.should.be.eq( 1 );
                done();
            } );
    } );
} );