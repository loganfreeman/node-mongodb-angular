var db = require( '../src/jugglingdb/init.js' );

var expect = require( 'chai' ).expect,
    should = require( 'chai' ).should();



describe( 'jugglingdb', function() {

    describe( '#init', function() {
        it( 'should initilize db', function() {

            db.should.have.property( 'users' );
        } );

    } );


    describe( '#users', function() {
        it( 'should get users in db', function(done) {
            db['users'].all( function(err, results) {
                if (err) {
                    done( err );
                } else {
                    console.log( results );
                    done();
                }
            } );
        } );
    } );


    describe( '#getUserById', function() {
        it( 'should get user by id in db', function(done) {
            db['users'].find( 2, function(err, user) {
                if (err) {
                    done( err );
                } else {
                    console.log( 'getUserById:' + JSON.stringify( user ) );
                    done();
                }
            } );
        } );
    } );

    describe( '#getUserByEmail', function() {
        it( 'should get user by email in db', function(done) {
            db['users'].all( {
                where: {
                    email: 'scheng@contactpointsolutions.com'
                }
            }, function(err, user) {
                    if (err) {
                        done( err );
                    } else {
                        console.log( 'getUserByEmail:' + JSON.stringify( user ) );
                        done();
                    }
                } );
        } );
    } );
} );