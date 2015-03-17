var db = require( '../jugglingdb/init.js' );

var Promise = require( 'bluebird' );

var bcrypt = require( 'bcrypt' );

var _ = require( 'lodash' );

module.exports = {
    getUserById: function(id) {


        return new Promise( function(resolve, reject) {
                db['users'].find( id, function(err, user) {
                    if (err) {
                        reject( err );
                    } else {
                        resolve( user );
                    }
                } );
            } );
    },

    getUserByEmail: function(email) {
        return new Promise( function(resolve, reject) {
                var params = {};
                params.where = {
                    email: email
                };
                db['users'].all( params, function(err, users) {
                    if (err) {
                        reject( err );
                    } else {
                        if (users.length == 1) {
                            resolve( users[0] );
                        } else {
                            reject( 'Found too many users with the email: ' + email );
                        }
                    }
                } );
            } );
    },


    getUsers: function() {
        return new Promise( function(resolve, reject) {
                db['users'].all( function(err, users) {
                    if (err) {
                        reject( err );
                    } else {
                        resolve( users );
                    }
                } );
            } );
    },


    login: function(username, password) {
        return new Promise( function(resolve, reject) {
                var params = {};
                params.where = {
                    name: username
                };
                db['users'].all( params, function(err, users) {
                    if (err) {
                        reject( err );
                    } else {
                        var matches = _.filter( users, function(user) {
                            return bcrypt.compareSync( password, user.password );
                        } );

                        if (matches.length == 1) {
                            resolve( matches[0] );
                        } else {
                            reject( 'Couldn\'t find the matching user in database' );
                        }
                    }
                } );
            } );
    },


    create: function(user) {
        var salt = bcrypt.genSaltSync( 10 );
        var hash = bcrypt.hashSync( user.password, salt );
        user.password = hash;
        return new Promise( function(resolve, reject) {
                db['users'].create( user, function(err, model) {
                    if (err) {
                        reject( err );
                    } else {
                        resolve( model );
                    }
                } );
            } );
    },


    destroy: function(user) {
        return new Promise( function(resolve, reject) {
                user.destroy( function(err, model) {
                    if (err) {
                        reject( err );
                    } else {
                        resolve( model );
                    }
                } );
            } );
    },

    update: function(user) {}
};