var _ = require( 'lodash' );

var expect = require( 'chai' ).expect,
    should = require( 'chai' ).should();

var MongoClient = require( 'mongodb' ).MongoClient;


var redis = require( 'redis' ),
    client = redis.createClient();




var jobs = require( './fixtures/addAgendas.js' );





var Promise = require( 'bluebird' );

describe( 'In jobs --> ', function() {


    var _db;

    var agenda;

    var url = 'mongodb://localhost:27017/test';


    before( function(done) {


        agenda = require( '../src/jobs.js' ).init( url );
        jobs.now( agenda );
        MongoClient.connect( url, function(err, db) {
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

        agenda.stop();
    } );


    it( 'should create collection', function(done) {
        _db.collections( function(err, names) {
            console.log( names );
            done();
        } );
    } );


    it( 'should create jobs', function(done) {
        _db.collection( 'agendaJobs', function(err, conn) {
            conn.find(
                {
                }, function(err, records) {
                    console.log( records );
                    done();
                } );
        } );
    } );





} );