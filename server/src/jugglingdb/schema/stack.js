module.exports = function(schema) {
    // define models
    var Stack = schema.define( 'stack', {
        name: {
            type: String
        },
        description: {
            type: String
        }
    } );



    schema['stack'] = Stack;
};

