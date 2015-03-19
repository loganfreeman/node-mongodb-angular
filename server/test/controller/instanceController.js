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
                done();
            }, function(err) {
                    done( err );
                } );
    } );
} );