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
                models.length.should.be.gt( 0 );
                done();
            }, function(err) {
                    done( err );
                } );
    } );


    it( 'should return stacks by env', function(done) {
        controller.getStacksByEnv( 1 )
            .then( function(models) {
                helpers.verifyArray( models, db['stack'] );
                _.each( models, function(model) {
                    model.instances( function(err, instances) {
                        helpers.verifyArray( instances, db['instance'] );
                    } );
                } );
                done();
            } )
            .catch( function(err) {
                done( err );
            } );
    } );


} );