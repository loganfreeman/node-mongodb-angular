var _ = require( 'lodash' );

var expect = require( 'chai' ).expect,
    should = require( 'chai' ).should();

var MongoClient = require( 'mongodb' ).MongoClient;



var Promise = require( 'bluebird' );

describe( 'In jobs --> ', function() {


    var _db;

    before( function(done) {
        MongoClient.connect( 'mongodb://localhost:27017/test', function(err, db) {
            if (!err) {
                console.log( 'We are connected' );
                _db = db;
                done();
            }
        } );


    } );

    after( function(done) {
        // clean up the test db
        _db.dropDatabase( function() {
            _db.close();
            done();
        } );
    } );


    it( 'should create instance', function() {} );





} );