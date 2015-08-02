var db = require( '../../src/config/database.js' );

var config = require( '../../src/config/config.js' );

var expect = require( 'chai' ).expect,
    should = require( 'chai' ).should();

describe( 'config', function() {
    describe( '#database', function() {
        it( 'should return configuration based on node env settings', function() {
            db.getAuthen().should.have.property( 'database' );
        } );

        it( 'should get baseurl', function() {
            config.getBaseUrl().should.be.eq( 'http://localhost:8081' );
        } );
    } );
} );