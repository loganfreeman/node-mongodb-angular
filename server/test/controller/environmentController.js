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


                helpers.verifyArray( models, db['environment'] );
                done();
            }, function(err) {
                    done( err );
                } );
    } );

    it( 'should create new environment', function(done) {
        var data = {
            name: 'stage',
            description: 'stage environment'
        };
        controller.create( data )
            .then( function(model) {
                model.should.be.instanceof( db['environment'] );
                model.should.have.property( 'id' );
                done();
            }, function(err) {
                    if (helpers.keyExists( err )) {
                        done();
                    } else {
                        done( err );
                    }
                } );
    } );
} );