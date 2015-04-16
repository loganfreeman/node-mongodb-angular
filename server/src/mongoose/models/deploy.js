var mongoose = require( 'mongoose' ),
    Promise = mongoose.Promise,
    Schema = mongoose.Schema,
    relationship = require( 'mongoose-relationship' );


var uniqueValidator = require( 'mongoose-unique-validator' );

var DeploySchema = new Schema( {
    deployDate: {
        type: Date,
        default: '',
        required: true
    },
    comments: {
        type: String,
        default: ''
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    instance: {
        type: Schema.ObjectId,
        ref: 'Instance'
    },
} );

mongoose.model( 'Deploy', DeploySchema );