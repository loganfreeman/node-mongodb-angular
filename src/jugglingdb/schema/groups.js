module.exports = function(schema) {
    // define models
    var Group = schema.define( 'groups', {
        name: {
            type: String
        },
        description: {
            type: String
        }
    } );


    schema['groups'] = Group;
};

