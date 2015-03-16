var db = require( '../jugglingdb/init.js' );

var Promise = require( 'bluebird' );

module.exports = {
    getUserById: function(id) {
        return db['users'].find( id );
    },

    getUserByEmail: function(email) {},


    getUsers: function() {},


    login: function(username, password) {},


    create: function(user) {},

    update: function(user) {}
};