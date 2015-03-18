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


    it( 'should create new deploy', function(done) {
        var data = {
            deploy_date: new Date,
            user_id: 2,
            instance_id: 1,
            comments: 'this is inserted by test'
        };
        controller.create(data)
            .then( function(model) {
                helpers.verifyId( model, db['deploy'] );
            } )
            .then( function() {
                done();
            } )
            .catch( function(e) {
                done( e );
            } );
    } );
} );