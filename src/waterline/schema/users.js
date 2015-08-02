var Waterline = require('waterline');

module.exports = function (orm) {
    var User = Waterline.Collection.extend({

        identity: 'users',
        tableName: 'users',
        connection: 'myLocalPostgres',
        migrate: 'safe',

        attributes: {

            firstName: {
                type: 'string',
                required: true
            },

            lastName: {
                type: 'string',
                required: true
            },

            name: {
                type: 'string',
                required: true
            },
            password: {
                type: 'string',
                required: true
            },

            email: {
                type: 'string',
                required: true
            }

        }
    });

    // Load the Models into the ORM
    orm.loadCollection(User);
}