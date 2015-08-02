module.exports = function(schema) {
    // define models
    var UserGroupAssoc = schema.define( 'user_group', {
        user_id: {
            type: Number
        },
        group_id: {
            type: Number
        }
    } );


    schema['user_group'] = UserGroupAssoc;
};

