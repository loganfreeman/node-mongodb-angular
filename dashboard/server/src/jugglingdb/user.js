var Schema = require( 'jugglingdb' ).Schema;
var schema = new Schema( 'postgres', {
    database: 'todo',
    host: 'localhost',
    port: 5432,
    username: 'michael',
    password: 'root',
    debug: true
} );


// define models
var User = schema.define( 'users', {
    firstName: {
        type: String
    },
    lastName: {
        type: String
    }
} );

// define any custom method
User.prototype.getFullName = function() {
    return this.firstName + ' ' + this.lastName;
};

module.exports = {
    User: User
};