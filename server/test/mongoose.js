
/**
 * Module dependencies.
 */

var _ = require( 'lodash' );

var expect = require( 'chai' ).expect,
    should = require( 'chai' ).should();

var mongoose = require( 'mongoose' );


require( '../src/mongoose/models' );



/**
 * Mongoose connection helper.
 */

function connect(database) {
    return mongoose.createConnection( 'mongodb://localhost/' + database );
}

describe( 'express-mongoose', function() {

    this.timeout( 5000 );
    var collection = 'drumsets_' + (Math.random() * 100000 | 0);
    var db, Drumset;

    before( function(done) {
        // add dummy data
        db = connect( 'test' );
        Drumset = db.model( 'Drumset', collection );
        var pending = 1;

        Drumset.create( {
            brand: 'Roland',
            color: 'black',
            type: 'electronic'
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




} );

describe( 'express-mongoose', function() {

    this.timeout( 5000 );
    var collection = 'drumsets_' + (Math.random() * 100000 | 0);
    var db, Drumset;

    before( function(done) {
        // add dummy data
        db = connect( 'test' );
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
