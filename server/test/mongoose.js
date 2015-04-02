
/**
 * Module dependencies.
 */

var _ = require( 'lodash' );

var expect = require( 'chai' ).expect,
    should = require( 'chai' ).should();

const mongoose = require( 'mongoose' ),
    express = require( 'express' ),
    assert = require( 'assert' ),
    Promise = mongoose.Promise,
    Schema = mongoose.Schema;

/**
 * Schema definition.
 */

var DrumsetSchema = new Schema( {
    brand: String,
    color: String,
    type: String,
    model: String
} );

/**
 * Schema methods.
 */

DrumsetSchema.statics.useQuery = function() {
    // return a Query
    return this.find( {
        color: 'black'
    } ).sort( '_id' );
};

DrumsetSchema.statics.usePromise = function() {
    var promise = new Promise();
    this.find( {
        type: 'Acoustic'
    } )
        .sort( '_id' )
        .exec( promise.resolve.bind( promise ) );
    return promise;
};

DrumsetSchema.statics.queryError = function() {
    // should produce an invalid query error
    return this.find( {
        color: {
            $fake: {
                $boom: []
            }
        }
    } ).sort( '_id' );
};

DrumsetSchema.statics.promiseError = function() {
    var promise = new Promise;
    promise.error( new Error( 'splat!' ) );
    return promise;
};

DrumsetSchema.statics.usePromiseRedirect = function(status) {
    var url = '/promise/redirect';
    var promise = new Promise;
    process.nextTick( function() {
        promise.complete( url, status );
    } );
    return promise;
};

mongoose.model( 'Drumset', DrumsetSchema );



/**
 * Mongoose connection helper.
 */

function connect() {
    return mongoose.createConnection( 'mongodb://localhost/express_goose_test' );
}

describe( 'express-mongoose', function() {

    this.timeout( 5000 );
    var collection = 'drumsets_' + (Math.random() * 100000 | 0);
    var db, Drumset;

    before( function(done) {
        // add dummy data
        db = connect();
        Drumset = db.model( 'Drumset', collection );
        var pending = 4;

        Drumset.create( {
            brand: 'Roland',
            color: 'black',
            type: 'electronic',
            _id: '4da8b662057a83596c000001'
        }, added );

        Drumset.create( {
            brand: 'GMS',
            color: 'Silver Sparkle',
            type: 'Acoustic',
            _id: '4da8b662057a83596c000002'
        }, added );

        Drumset.create( {
            brand: 'DW',
            color: 'Broken Glass',
            type: 'Acoustic',
            _id: '4da8b662057a83596c000003'
        }, added );

        Drumset.create( {
            brand: 'Meinl',
            color: 'black',
            type: 'Acoustic',
            _id: '4da8b662057a83596c000004'
        }, added );

        function added(err) {
            if (added.err) return;

            if (err) {
                db.close();
                return done( added.err = err );
            }

            if (--pending) return;
            done();
        }
    } );

    after( function(done) {
        // clean up the test db
        db.db.dropDatabase( function() {
            db.close();
            done();
        } );
    } );

    it( 'should useQuery', function(done) {
        Drumset.useQuery().exec( function(err, models) {
            //console.log( model );
            _.each( models, function(model) {
                model.color.should.be.eq( 'black' );
            } );

            done();
        } );
    } );

    it( 'should usePromise', function(done) {
        Drumset.usePromise()
            .then( function(models) {
                _.each( models, function(model) {
                    model.type.should.be.eq( 'Acoustic' );
                } );
                done();
            } );
    } );

    it( 'should queryError', function(done) {
        Drumset.queryError().exec( function(err, models) {
            expect( err ).not.be.null;
            done();
        } );
    } );



} );
