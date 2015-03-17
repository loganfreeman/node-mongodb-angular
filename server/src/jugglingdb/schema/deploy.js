module.exports = function(schema) {
    // define models
    var Deploy = schema.define( 'deploy', {
        user_id: {
            type: Number
        },
        description: {
            type: String
        },
        ip: {
            type: String
        }
    } );



    schema['deploy'] = Deploy;
};