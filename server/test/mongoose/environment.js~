/**
 * Module dependencies.
 */

var _ = require( 'lodash' );

var expect = require( 'chai' ).expect,
    should = require( 'chai' ).should();

var mongoose = require( 'mongoose' );


require( '../../src/mongoose/models' );

var Promise = require( 'bluebird' );



/**
 * Mongoose connection helper.
 */

function connect(database) {
    return mongoose.createConnection( 'mongodb://localhost/' + database );
}


describe( 'user schema', function() {

    this.timeout( 5000 );
    var db, Environment, Stack;

    before( function(done) {
        // add dummy data
        db = connect( 'test' );
        Environment = db.model( 'Environment' );
        Stack = db.model( 'Stack' );
        Instance = db.model( 'Instance' );

        var environment = Environment.create( {
            name: 'sample Environment'
        } );

        var stackPromise = Stack.create( {
            name: 'stack #1'
        } );

        var stackPromise1 = Stack.create( {
            name: 'stack #2'
        } );

        var envId;

        environment
            .then( function(env) {
                envId = env.id;
                env.name.should.be.eq( 'sample Environment' );
                Promise.all( [stackPromise, stackPromise1] )
                    .then( function(values) {
                        Promise.resolve( values )
                            .map( function(stack) {
                                stack.environment = env._id;
                                return stack.save();
                            } )
                            .then( function(savePromises) {
                                Promise.all( savePromises )
                                    .then( function(stacks) {
                                        _.each( stacks, function(stack) {
                                            stack.environment.toString().should.be.eq( envId );
                                        } );
                                        done();
                                    } );
                            } );

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



    it( 'should load by Id', function(done) {
        Environment.findOne( {
            name: 'sample Environment'
        } ).exec()
            .then( function(env) {
                env.stacks.length.should.be.eq( 2 );
                env.name.should.be.eq( 'sample Environment' );
                env.description = 'set by unit test';
                env.save().should.be.instanceOf( mongoose.Promise );
                env.save().then( function(env) {
                    // console.log(env);
                    env.description.should.be.eq( 'set by unit test' );
                    done();
                } );

            } );
    } );

    it( 'should add instances', function(done) {
        var stack;
        Environment.findOne( {
            name: 'sample Environment'
        } ).exec()
            .then( function(env) {
                env.stacks.length.should.be.eq( 2 );
                stack = env.stacks[0];
                // console.log(stack);
                var instances = [];
                instances.push( Instance.create( {
                    name: '1st instance'
                } ) );
                instances.push( Instance.create( {
                    name: '2rd instance'
                } ) );
                Promise.all( instances )
                    .map( function(instance) {
                        instance.stacks.push( stack );
                        return instance.save();
                    } )
                    .then( function(instances) {
                        _.each( instances, function(instance) {
                            console.log( instance );
                        } );
                        return Stack.findById( stack ).exec();
                    } )
                    .then( function(stack) {
                        // console.log(stack);
                        stack.instances.length.should.be.eq( 2 );
                        done();
                    } );
            } );
    } );


    it( 'should add stacks', function(done) {
        var stack;
        Environment.findOne( {
            name: 'sample Environment'
        } ).exec()
            .then( function(env) {
                env.stacks.length.should.be.eq( 2 );
                stack = env.stacks[0];

                var promises = [];
                promises.push( Stack.findById( stack ).exec() );
                promises.push( Instance.create( {
                    name: 'instance_a'
                } ) );
                promises.push( Instance.create( {
                    name: 'instance_b'
                } ) );
                Promise.all( promises )
                    .then( function(instances) {
                        var stack = instances.shift();
                        _.each( instances, function(instance) {
                            //console.log( instance );
                            stack.instances.push( instance );
                        } );
                        return stack.save();
                    } )
                    .then( function(stack) {
                        console.log( stack );
                        return Instance.find( {
                            name: {
                                $in: ['instance_a', 'instance_b']
                            }
                        } ).exec();
                    } )
                    .then( function(instances) {
                        instances.length.should.be.eq( 2 );
                        done();
                    } );
            } );
    } );



    it( 'should associate stacks with environment', function(done) {
        Environment.findOne( {
            name: 'sample Environment'
        } ).exec()
            .then( function(env) {
                env.stacks.length.should.be.eq( 2 );
                Promise.resolve( env.stacks )
                    .map( function(stackId) {
                        return Stack.findById( stackId ).exec();
                    } )
                    .then( function(stackPromises) {
                        Promise.all( stackPromises )
                            .then( function(stacks) {
                                _.each( stacks, function(stack) {
                                    stack.environment.toString().should.be.eq( env.id );
                                } );
                                done();
                            } );
                    } );

            } );
    } );

} );