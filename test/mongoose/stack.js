var _ = require( 'lodash' );

var expect = require( 'chai' ).expect,
    should = require( 'chai' ).should();

var mongoose = require( 'mongoose' );


require( '../../src/mongoose/models' );

var Promise = require( 'bluebird' );

function connect(database) {
    return mongoose.createConnection( 'mongodb://localhost/' + database );
}


describe( 'In stack --> ', function() {

    var db, Instance, Stack;

    var stack,
        _instances = [];

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

        var instanceP3 = Instance.create( {
            name: 'c',
            serviceType: 'PCP'
        } );
        var instanceP4 = Instance.create( {
            name: 'd',
            serviceType: 'PCP'
        } );


        Promise.all( [stackPromise, instanceP1, instanceP2, instanceP3, instanceP4] )
            .then( function(values) {
                stack = values.shift();
                var promises = [];
                promises.push( stack.update( {
                    $addToSet: {
                        instances: {
                            $each: values
                        }
                    }
                } ) );

                _.map( values, function(instance) {
                    promises.push( instance.update( {
                        $addToSet: {
                            stacks: stack
                        }
                    } ) );
                } );

                return Promise.all( promises );
            } )
            .then( function(result) {
                return Instance.find( {
                    name: {
                        $in: ['a', 'b', 'c', 'd']
                    }
                } ).exec();
            } )
            .then( function(instances) {
                _.each( instances, function(instance) {
                    instance.stacks[0].toString().should.be.eq( stack._id.toString() );
                    _instances.push( instance._id );
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


    it( 'should create instance', function(done) {
        var promise = Promise.resolve( Stack.find( {
            name: 'stack #1'
        } ).exec().then( function(stacks) {
            var stack = stacks.shift();
            //console.log( instance );
            _.each( _instances, function(instance) {
                stack.instances.push( instance );
            } );
            return stack.save();
        } )
            .then( function(stack) {
                console.log( stack );
                done();
            } )
        );
        promise.catch( function(err) {
            done( err );
        } );

    } );

    it( 'should create instance', function(done) {
        var thenable = Stack.find( {
            name: 'stack #1'
        } ).exec().then( function(stacks) {
            var stack = stacks.shift();
            //console.log( instance );
            _.each( _instances, function(instance) {
                stack.instances.push( instance );
            } );
            return stack.save();
        } )
            .then( function(stack) {
                console.log( stack );
                done();
            } );

        var promise = Promise.resolve( thenable );

        promise.catch( function(err) {
            done( err );
        } );

    } );

    it( 'should not insert duplicate instance', function(done) {
        var thenable = Stack.find( {
            name: 'stack #1'
        } ).exec().then( function(stacks) {
            var stack = stacks.shift();
            console.log( _instances );
            stack.instances = _instances.slice( 2 );
            return stack.save();
        } )
            .then( function(stack) {
                console.log( stack );
                return Instance.find( {
                    '_id': {
                        $in: stack.instances
                    }
                } ).exec();
            } )
            .then( function(instances) {
                console.log( instances );
                done();
            } );
        var promise = Promise.resolve( thenable );

        promise.catch( function(err) {
            done( err );
        } );
    } );

    it( 'should not insert duplicate instance', function(done) {
        var thenable = Stack.find( {
            name: 'stack #1'
        } ).exec().then( function(stacks) {
            var stack = stacks.shift();
            console.log( _instances );
            stack.instances = _instances.slice( 3 );
            return stack.save();
        } )
            .then( function(stack) {
                console.log( stack );
                return Instance.find( {
                    '_id': {
                        $in: stack.instances
                    }
                } ).exec();
            } )
            .then( function(instances) {
                console.log( instances );
                done();
            } );
        var promise = Promise.resolve( thenable );

        promise.catch( function(err) {
            done( err );
        } );
    } );



} );