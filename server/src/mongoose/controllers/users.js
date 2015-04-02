
/**
 * Module dependencies.
 */

var mongoose = require( 'mongoose' );
var User = mongoose.model( 'User' );
var utils = require( '../utils' );

var Promise = require( 'bluebird' );

/**
 * Load
 */

exports.getUserById = function(id) {
    var options = {
        criteria: {
            _id: id
        }
    };
    return new Promise( function(resolve, reject) {
            User.load( options, function(err, user) {
                if (err) {
                    reject( err );
                } else {
                    resolve( user );
                }
            } );
        } );
};

/**
 * Create user
 */

exports.create = function(data) {
    var user = new User( data );
    return new Promise( function(resolve, reject) {} );
};


