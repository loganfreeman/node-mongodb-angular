var config = require( '../../src/config/database.js' );

var expect = require( 'chai' ).expect,
    should = require( 'chai' ).should();

describe( 'config', function() {
    describe( '#database', function() {
        it( 'should return configuration based on node env settings', function() {
            config.getAuthen().should.have.property( 'database' );
        } );
    } );
} );