/**
 *
 *
 *
 *
 * @author scheng
 */


var controller = require( '../../src/controller/environmentController.js' );

var db = require( '../../src/jugglingdb/init.js' );


var _ = require( 'lodash' );

var expect = require( 'chai' ).expect,
    should = require( 'chai' ).should();


var helpers = require( '../helpers.js' );



describe( 'environmentController', function() {
    it( 'should return environments', function(done) {
        controller.getEnvironments()
            .then( function(models) {

                helpers.verifyArray( models, db['environments'] );
                done();
            }, function(err) {
                    done( err );
                } );
    } );
} );