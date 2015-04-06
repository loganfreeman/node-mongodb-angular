/**
 * Module dependencies.
 */

var _ = require( 'lodash' );

var expect = require( 'chai' ).expect,
    should = require( 'chai' ).should();

var mongoose = require( 'mongoose' );


require( '../../src/mongoose/models' );

var Promise = require( 'bluebird' );


var ObjectId = mongoose.Schema.Types.ObjectId;


/**
 * Mongoose connection helper.
 */

function connect(database) {
    return mongoose.createConnection( 'mongodb://localhost/' + database );
}


describe( 'user schema', function() {

    this.timeout( 5000 );
    var db, Deploy, Stack, User, Instance, user, deploy, instance;

    var sample = {
        firstname: 'Roland',
        lastname: 'black',
        password: 'electronic',
        username: 'test',
        email: 'barray@cctv.com'
    };


    before( function(done) {
        // add dummy data
        db = connect( 'test' );
        Deploy = db.model( 'Deploy' );
        Stack = db.model( 'Stack' );
        Instance = db.model( 'Instance' );
        User = db.model( 'User' );
        User.create( sample ).then( function(model) {
            user = model;
            return Deploy.create( {
                deployDate: new Date(),
                user: user._id
            } );
        } )
            .then( function(model) {
                deploy = model;
                return Instance.create( {
                    name: 'test'
                } );
            } )
            .then( function(model) {
                instance = model;
                deploy.instance = instance._id;
                return deploy.save();
            } )
            .then( function(model) {
                console.log( model );
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



    it( 'should load by Id', function(done) {
        User.findById( deploy.user ).exec().then( function(user) {
            user.email.should.be.eq( 'barray@cctv.com' );
            done();
        } );
    } );

    it( 'should set instance', function(done) {
        Instance.findById( deploy.instance ).exec().then( function(instance) {
            instance.name.should.be.eq( 'test' );
            instance.deploys.length.should.be.eq( 1 );
            console.log( instance );
            done();
        } );
    } );



} );