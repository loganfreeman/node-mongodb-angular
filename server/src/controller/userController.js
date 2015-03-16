var db = require( '../jugglingdb/init.js' );

module.exports = {
    getUserById: function(id) {
        db['users'].find( id, function(err, model) {} );
    },

    getUserByEmail: function(email) {},


    getUsers: function() {},


    login: function(username, password) {},


    create: function(user) {},

    update: function(user) {}
};