module.exports = function(schema) {
    // define models
    var Deploy = schema.define( 'deploy', {
        user_id: {
            type: Number
        },
        comments: {
            type: String
        },
        deploy_date: {
            type: Date
        },
        instance_id: {
            type: Number
        }
    } );



    schema['deploy'] = Deploy;
};