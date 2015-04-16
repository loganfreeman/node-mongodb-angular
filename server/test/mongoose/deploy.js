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


describe( '#deploy schema#', function() {

    this.timeout( 5000 );
    var db, Deploy, Stack, User, Instance, user, deploy, instance;

    var sample = {
        firstname: 'Roland',
        lastname: 'black',
        password: 'electronic',
        username: 'test',
        email: 'barray@cctv.com'
    };

    var count = 0;

    before( function(done) {
        // add dummy data
        db = connect( 'test' );
        Deploy = db.model( 'Deploy' );
        Stack = db.model( 'Stack' );
        Instance = db.model( 'Instance' );
        User = db.model( 'User' );
        Promise.resolve( User.create( sample ) ).then( function(model) {
            user = model;
            return Deploy.create( {
                deployDate: new Date(),
                user: user._id
            } );
        } )
            .then( function(model) {
                deploy = model;
                return Instance.create( {
                    name: 'test',
                    serviceType: 'PCP'
                } );
            } )
            .then( function(model) {
                instance = model;
                deploy.instance = instance._id;
                count++;
                return deploy.save();
            } )
            .then( function(deploy) {
                return Deploy.create( {
                    deployDate: new Date(),
                    user: user._id
                } );
            } )
            .then( function(deploy) {
                deploy.instance = instance._id;
                count++;
                return deploy.save();
            } )
            .then( function(deploy) {
                return Deploy.create( {
                    deployDate: new Date(),
                    user: user._id
                } );
            } )
            .then( function(deploy) {
                deploy.instance = instance._id;
                count++;
                return deploy.save();
            } )
            .then( function(deploy) {
                return Deploy.create( {
                    deployDate: new Date(),
                    user: user._id
                } );
            } )
            .then( function(deploy) {
                deploy.instance = instance._id;
                count++;
                return deploy.save();
            } )
            .then( function(deploy) {
                return Deploy.create( {
                    deployDate: new Date(),
                    user: user._id
                } );
            } )
            .then( function(deploy) {
                deploy.instance = instance._id;
                count++;
                return deploy.save();
            } )
            .then( function() {
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



    it( 'should load by Id', function(done) {
        User.findById( deploy.user ).exec().then( function(user) {
            user.email.should.be.eq( 'barray@cctv.com' );
            done();
        } );
    } );

    it( 'should set instance', function(done) {
        console.log( deploy );
        Promise.resolve( Instance.findById( deploy.instance ).exec() ).then( function(instance) {
            instance.name.should.be.eq( 'test' );
            instance.deploys.length.should.be.eq( count );
            console.log( instance );
            done();
        } )
            .catch( function(err) {
                done( err );
            } );
    } );

    it( 'should get deploy by user ID', function(done) {
        var db = connect( 'devops' );
        var Deploy = db.model( 'Deploy' );
        Promise.resolve().then( function() {
            return Deploy.find( {
                user: '5522ccb251c4decbb4ec7be5'
            } ).exec();
        } )
            .then( function(deploys) {
                deploys.length.should.be.gt( 0 );
                _.each( deploys, function(deploy) {
                    deploy.user.toString().should.be.eq( '5522ccb251c4decbb4ec7be5' );
                } );
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