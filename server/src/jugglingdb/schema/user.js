module.exports = function(schema) {
    // define models
    var User = schema.define( 'users', {
        firstName: {
            type: String
        },
        lastName: {
            type: String
        },
        name: {
            type: String
        },
        email: {
            type: String
        },
        password: {
            type: String
        }
    } );

    // define any custom method
    User.prototype.getFullName = function() {
        return this.firstName + ' ' + this.lastName;
    };


    User.prototype.getGroups = function(argument) {
        /* body... */
    };

    schema['users'] = User;
};

