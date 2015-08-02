var expect = require( 'chai' ).expect,
    should = require( 'chai' ).should();

var _ = require( 'lodash' );

var async = require( 'async' );

var controller = require( '../src/controller/chargifyController.js' );

var moment = require( 'moment' );

var Promise = require( 'bluebird' );

var request = Promise.promisify( require( 'request' ) );
// request.debug = true;

var queryString = require( 'querystring' );


describe( 'chargifyController', function() {
    it( 'should list users', function(done) {
        controller.getCustomers()
            .then( function(res) {
                //console.log( res[0] );
                res.should.be.instanceof( Array );
                res.length.should.be.gt( 0 );
                res[0].should.have.property( 'customer' );
                done();
            } )
            .catch( function(err) {
                done( err );
            } );
    } );
} );