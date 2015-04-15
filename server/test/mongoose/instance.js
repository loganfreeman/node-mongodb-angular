var _ = require( 'lodash' );

var expect = require( 'chai' ).expect,
    should = require( 'chai' ).should();

var mongoose = require( 'mongoose' );


require( '../../src/mongoose/models' );

var Promise = require( 'bluebird' );

function connect(database) {
    return mongoose.createConnection( 'mongodb://localhost/' + database );
}


describe( '#instance#', function() {
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
            name: 'a',
            serviceType: 'PCP'
        } );
        var instanceP2 = Instance.create( {
            name: 'b',
            serviceType: 'PCP'
        } );

        var envId, stack;

        Promise.all( [stackPromise, instanceP1, instanceP2] )
            .then( function(values) {
                stack = values.shift();
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
        Instance.find( {
            name: 'a'
        } ).exec().then( function(instances) {
            var instance = instances.shift();
            console.log( instance );
            instance.serviceType.should.be.eq( 'PCP' );
            done();
        } );
    } );

} );