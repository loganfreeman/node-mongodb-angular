var Promise = require( 'bluebird' );


var request = require( 'request' );

describe( 'bluebird', function() {
    it( 'should return promise', function(done) {

        Promise.resolve( request( 'http://www.google.com' ) )
            .then( function(result) {
                console.log( result );
                done();
            }, function(err) {
                    done( err );
                } );
    } );
} );