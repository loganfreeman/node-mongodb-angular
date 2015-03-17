module.exports = function(schema) {
    // define models
    var Environment = schema.define( 'environment', {
        name: {
            type: String
        },
        description: {
            type: String
        }
    } );



    schema['environment'] = Environment;
};

