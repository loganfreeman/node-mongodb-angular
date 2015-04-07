var _ = require( 'lodash' );

var expect = require( 'chai' ).expect,
    should = require( 'chai' ).should();

var mongoose = require( 'mongoose' );


require( '../../src/mongoose/models' );

var Promise = require( 'bluebird' );

function connect(database) {
    return mongoose.createConnection( 'mongodb://localhost/' + database );
}


describe( 'stack', function() {


    it( 'should find stack by environment', function(done) {

        var db = connect( 'devops' );
        var Stack = db.model( 'Stack' );

        Promise.resolve()
            .then( function() {
                return Stack.find( {
                    environment: '5524074382e2147f53ab703c'
                } ).exec();
            } )
            .then( function(stacks) {
                stacks.length.should.be.gt( 0 );
                _.each( stacks, function(stack) {
                    stack.environment.toString().should.be.eq( '5524074382e2147f53ab703c' );
                } );
                done();
            } );
    } );
} );