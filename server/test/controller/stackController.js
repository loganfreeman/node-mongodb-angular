/**
 *
 *
 *
 *
 * @author scheng
 * 
 */


var controller = require( '../../src/controller/stackController.js' );

var db = require( '../../src/jugglingdb/init.js' );


var _ = require( 'lodash' );

var expect = require( 'chai' ).expect,
    should = require( 'chai' ).should();


var helpers = require( '../helpers.js' );



describe( 'stackController', function() {
    it( 'should return stacks', function(done) {
        controller.getStacks()
            .then( function(models) {

                helpers.verifyArray( models, db['stack'] );
                done();
            }, function(err) {
                    done( err );
                } );
    } );
} );