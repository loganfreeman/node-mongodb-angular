var mongoose = require( 'mongoose' );

describe( 'mongoose', function() {
    it( 'should connect', function(done) {
        var conn = mongoose.connect( 'mongodb://localhost/devops' ).connection;
        conn.once( 'open', function() {
            done();
        } )
            .on( 'error', function(err) {
                done( err );
            } );
    } );
} );