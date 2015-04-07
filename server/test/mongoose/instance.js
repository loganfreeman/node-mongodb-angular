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
        var Instance = db.model( 'Instance' );

        Promise.resolve()
            .then( function() {
                return Instance.find( {
                    stack: '55240b57bee167e458d8fd17'
                } ).exec();
            } )
            .then( function(instances) {
                instances.length.should.be.gt( 0 );
                _.each( instances, function(instance) {
                    instance.stack.toString().should.be.eq( '55240b57bee167e458d8fd17' );
                } );
                done();
            } );
    } );
} );