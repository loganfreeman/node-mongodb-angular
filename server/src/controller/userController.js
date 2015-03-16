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

    getUserByEmail: function(email) {},


    getUsers: function() {},


    login: function(username, password) {},


    create: function(user) {},

    update: function(user) {}
};