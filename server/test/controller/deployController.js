/**
 *
 *
 *
 * @author scheng
 */

var controller = require( '../../src/controller/deployController.js' );

var db = require( '../../src/jugglingdb/init.js' );


var _ = require( 'lodash' );

var expect = require( 'chai' ).expect,
    should = require( 'chai' ).should();


var helpers = require( '../helpers.js' );



describe( 'deployController', function() {
    it( 'should return deploys', function(done) {
        controller.getDeploys()
            .then( function(models) {

                helpers.verifyArray( models, db['deploy'] );
                done();
            }, function(err) {
                    done( err );
                } );
    } );
} );