var mongoose = require( 'mongoose' );


var models = require( '../src/mongoose/models' );

var User = models.User;

var expect = require( 'chai' ).expect,
    should = require( 'chai' ).should();


describe( 'mongoose', function() {

    this.timeout( 5000 );

    before( function(done) {
        var conn = mongoose.connect( 'mongodb://localhost/devops' ).connection;
        conn.once( 'open', function() {
            models.should.have.property( 'User' );
            var user = new models.User( {
                firstname: 'barry',
                lastname: 'allan',
                username: 'barry.allan',
                email: 'ballan@flash.com',
                password: 'test'
            } );
            user.save( function(err, model) {
                if (err)
                    throw err;
                done();
            } );
        } )
            .on( 'error', function(err) {
                throw err;
            } );
    } );


    after( function(done) {
        var options = {
            criteria: {
                email: 'ballan@flash.com'
            }
        };
        User.load( options, function(err, user) {
            user.email.should.be.eq( 'ballan@flash.com' );
            user.remove( function(err) {
                if (err)
                    throw err;
                done();
            } );
        } );
    } );

    it( 'should have User', function(done) {
        var options = {
            criteria: {
                email: 'ballan@flash.com'
            }
        };
        User.load( options, function(err, user) {
            user.email.should.be.eq( 'ballan@flash.com' );
            done();
        } );
    } );


} );