module.exports = function(schema) {
    // define models
    var Instance = schema.define( 'instance', {
        name: {
            type: String
        },
        description: {
            type: String
        },
        ip: {
            type: String
        },
        stack_id: {
            type: Number
        }
    } );


    schema['instance'] = Instance;
};

