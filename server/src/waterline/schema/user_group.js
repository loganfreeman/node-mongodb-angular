var Waterline = require( 'waterline' );

module.exports = function(orm) {
    var UserGroup = Waterline.Collection.extend( {

        identity: 'user_group',
        tableName: 'user_group',
        connection: 'myLocalPostgres',

        attributes: {

            user_id: {
                type: 'integer',
                required: true
            },

            group_id: {
                type: 'integer',
                required: true
            },

            id: {
                type: 'integer'
            }

        }
    } );

    // Load the Models into the ORM
    orm.loadCollection( UserGroup );
};