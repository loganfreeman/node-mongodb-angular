'use strict';

var passport = require( 'passport' );

var session = {};

var auth = require( '../auth.js' );

/**
 * Session
 * returns info on authenticated user
 */
session.session = function(req, res) {
    res.json( req.user.user_info );
};

/**
 * Logout
 * returns nothing
 */
session.logout = function(req, res) {
    if (req.user) {
        req.logout();
        res.send( 200 );
    } else {
        res.send( 400, 'Not logged in' );
    }
};

/**
 *  Login
 *  requires: {email, password}
 */
session.login = function(req, res, next) {
    passport.authenticate( 'local', function(err, user, info) {
        var error = err || info;
        if (error) {
            return res.json( 400, error );
        }
        req.logIn( user, function(err) {
            if (err) {
                return res.send( err );
            }
            res.json( req.user.user_info );
        } );
    } )( req, res, next );
};

module.exports = function(app) {
    app.get( '/auth/session', auth.ensureAuthenticated, session.session );
    app.post( '/auth/session', session.login );
    app.del( '/auth/session', session.logout );
};