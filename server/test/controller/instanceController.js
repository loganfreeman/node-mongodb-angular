/**
 *
 *
 *
 * @author scheng
 */


var controller = require( '../../src/controller/instanceController.js' );

var db = require( '../../src/jugglingdb/init.js' );


var _ = require( 'lodash' );

var expect = require( 'chai' ).expect,
    should = require( 'chai' ).should();


var helpers = require( '../helpers.js' );



describe( 'instanceController', function() {
    it( 'should return instances', function(done) {
        controller.getInstances()
            .then( function(models) {

                helpers.verifyArray( models, db['instance'] );
                _.each( models, function(model) {
                    model.stack( function(err, stack) {
                        stack.should.be.instanceof( db['stack'] );
                    } );
                } );
                done();
            }, function(err) {
                    done( err );
                } );
    } );

    it( 'should return instances by stack Id', function(done) {
        controller.getInstancesByStack( 1 )
            .then( function(models) {
                helpers.verifyArray( models, db['instance'] );
                models.length.should.be.gt( 0 );
                done();
            } )
            .catch( function(err) {
                done( err );
            } );
    } );
} );