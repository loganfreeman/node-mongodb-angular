var mongoose = require( 'mongoose' );

var config = require( '../config/config.js' );
var util = require('util');


var dbPort = process.env.OPENSHIFT_MONGODB_DB_PORT || "27017";
var dbHost = process.env.OPENSHIFT_MONGODB_DB_HOST || "127.0.0.1";
var dbName = config.mongo.database;
var dbUser = process.env.OPENSHIFT_MONGODB_DB_USERNAME;
var dbPass = process.env.OPENSHIFT_MONGODB_DB_PASSWORD;
var template = "mongodb://%s:%s@%s:%s/%s";
var mongoConnectionString = util.format(template, dbUser, dbPass, dbHost, dbPort, dbName);

exports.connect = function connect() {
    if(!dbUser) return mongoose.createConnection( 'mongodb://localhost/' + dbName );
    else{
        return mongoose.createConnection(mongoConnectionString);
    }
};
/**
 * Formats mongoose errors into proper array
 *
 * @param {Array} errors
 * @return {Array}
 * @api public
 */

exports.errors = function(errors) {
    var keys = Object.keys( errors );
    var errs = [];

    // if there is no validation error, just display a generic error
    if (!keys) {
        return ['Oops! There was an error'];
    }

    keys.forEach( function(key) {
        if (errors[key]) {
            errs.push( errors[key].message );
        }
    } );

    return errs;
};

/**
 * Index of object within an array
 *
 * @param {Array} arr
 * @param {Object} obj
 * @return {Number}
 * @api public
 */

exports.indexof = function(arr, obj) {
    var index = -1; // not found initially
    var keys = Object.keys( obj );
    // filter the collection with the given criterias
    var result = arr.filter( function(doc, idx) {
        // keep a counter of matched key/value pairs
        var matched = 0;

        // loop over criteria
        for (var i = keys.length - 1; i >= 0; i--) {
            if (doc[keys[i]] === obj[keys[i]]) {
                matched++;

                // check if all the criterias are matched
                if (matched === keys.length) {
                    index = idx;
                    return idx;
                }
            }
        }
    } );
    return index;
};

/**
 * Find object in an array of objects that matches a condition
 *
 * @param {Array} arr
 * @param {Object} obj
 * @param {Function} cb - optional
 * @return {Object}
 * @api public
 */

exports.findByParam = function(arr, obj, cb) {
    var index = exports.indexof( arr, obj );
    if (~index && typeof cb === 'function') {
        return cb( undefined, arr[index] );
    } else if (~index && !cb) {
        return arr[index];
    } else if (!~index && typeof cb === 'function') {
        return cb( 'not found' );
    }
    // else undefined is returned
};