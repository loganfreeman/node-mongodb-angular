'use strict';

var passport = require( 'passport' );

var session = {};

var auth = require( '../auth.js' );

var mongoUtil = require( '../mongoose/utils.js' );

var db = mongoUtil.connect();


var User = db.model( 'User' );
var passport = require( 'passport' );
var ObjectId = require( 'mongoose' ).Types.ObjectId;

var path = require( 'path' );


var adminSecret = require( 'fs' ).readFileSync( path.resolve( __dirname, '../../adminSecret' ), 'utf8' ).trim();

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

session.remove = function(req, res, next) {
    User.remove( {
        _id: req.params.userid
    } ).then( function() {
        return res.send( 'User deleted' );
    } ).catch( function(err) {
        return res.status( 400 ).send( 'Encountered unexpected error' );
    } );
};

session.create = function(req, res, next) {
    var newUser = new User( req.body );

    newUser.save( function(err) {
        if (err) {
            return res.json( 400, err );
        }

        req.logIn( newUser, function(err) {
            if (err) return next( err );
            return res.json( newUser.user_info );
        } );
    } );
};

session.createAdmin = function(req, res, next) {

    var secret = req.body.secret.trim();

    delete req.body.secret;

    //console.log(secret);
    //console.log(adminSecret);

    if (adminSecret !== secret) {
        return res.status( 401 ).json( {
            message: 'Not Authorized'
        } );
    }
    var newUser = new User( req.body );

    newUser.type = 'Administrator';

    newUser.save( function(err) {
        if (err) {
            return res.json( 400, err );
        }

        req.logIn( newUser, function(err) {
            if (err) return next( err );
            return res.json( newUser.user_info );
        } );
    } );
};

/**
 *  Show profile
 *  returns {username, profile}
 */
session.show = function(req, res, next) {
    var userId = req.params.userId;

    User.findById( ObjectId( userId ), function(err, user) {
        if (err) {
            return next( new Error( 'Failed to load User' ) );
        }
        if (user) {
            res.send( {
                username: user.username,
                profile: user.profile
            } );
        } else {
            res.send( 404, 'USER_NOT_FOUND' );
        }
    } );
};

/**
 *  Username exists
 *  returns {exists}
 */
session.exists = function(req, res, next) {
    var username = req.params.username;
    User.findOne( {
        username: username
    }, function(err, user) {
            if (err) {
                return next( new Error( 'Failed to load User ' + username ) );
            }

            if (user) {
                res.json( {
                    exists: true
                } );
            } else {
                res.json( {
                    exists: false
                } );
            }
        } );
};

module.exports = function(app) {
    app.get( '/auth/session', auth.ensureAuthenticated, session.session );
    app.post( '/auth/session', session.login );
    app.delete( '/auth/session', session.logout );
    app.delete( '/auth/user/:userid', session.remove );
    app.post( '/auth/users', session.create );
    app.post( '/auth/admin/users', session.createAdmin );
    app.get( '/auth/users/:userId', session.show );
    app.get( '/auth/check_username/:username', session.exists );
};