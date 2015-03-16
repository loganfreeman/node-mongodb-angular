var db = require( '../src/jugglingdb/init.js' );

var expect = require( 'chai' ).expect,
    should = require( 'chai' ).should();



describe( 'jugglingdb', function() {
    describe( '#init', function() {
        it( 'should initilize db', function() {

            db.should.have.property( 'users' );
        } );
    } );
} );