var Waterline = require( 'waterline' );

module.exports = function(orm) {
    var Group = Waterline.Collection.extend( {

        identity: 'groups',
        tableName: 'groups',
        connection: 'myLocalPostgres',
        migrate: 'safe',

        attributes: {

            name: {
                type: 'string',
                required: true
            },

            description: {
                type: 'string',
                required: true
            }

        }
    } );

    // Load the Models into the ORM
    orm.loadCollection( Group );
};