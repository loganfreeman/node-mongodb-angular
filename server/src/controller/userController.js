var db = require( '../jugglingdb/init.js' );

var Promise = require( 'bluebird' );

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
                    name: username,
                    password: password
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


    create: function(user) {},

    update: function(user) {}
};