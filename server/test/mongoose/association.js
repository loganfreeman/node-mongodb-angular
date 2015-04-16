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
    var db, Instance, Stack, Association;

    var stacks = [];

    before( function(done) {
        // add dummy data
        db = connect( 'test' );
        Stack = db.model( 'Stack' );
        Instance = db.model( 'Instance' );
        Association = db.model( 'StackInstance' );


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

                var stacks = values.slice( 0, 4 );
                var instances = values.slice( 4 );
                var promises = [];
                _.each( stacks, function(stack) {
                    _.each( instances, function(instance) {
                        var ass = Association.create( {
                            stack: stack._id,
                            instance: instance._id
                        } );
                        promises.push( ass );
                    } );
                } );
                Promise.all( promises )
                    .then( function(models) {
                        done();
                    } );
            } );

    } );

    after( function(done) {
        // clean up the test db
        db.db.dropDatabase( function() {
            db.close();
            done();
        } );
    } );

    it( 'should create association', function(done) {
        Association.find().then( function(models) {
            models.length.should.be.eq( 8 );
            done();
        } );
    } );





} );