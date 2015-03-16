var db = require( '../src/jugglingdb/init.js' );

var expect = require( 'chai' ).expect,
    should = require( 'chai' ).should();



describe( 'jugglingdb', function() {

    describe( '#init', function() {
        it( 'should initilize db', function() {

            db.should.have.property( 'users' );
        } );

    } );


    describe( '#users', function(done) {
        db['users'].all( function(err, results) {
            if (err) {
                done( err );
            } else {
                console.log( results );
                done();
            }
        } );
    } );


    describe( '#getUserById', function(done) {
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