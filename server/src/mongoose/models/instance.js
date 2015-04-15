var mongoose = require( 'mongoose' ),
    Promise = mongoose.Promise,
    Schema = mongoose.Schema,
    relationship = require( 'mongoose-relationship' );


var uniqueValidator = require( 'mongoose-unique-validator' );

var InstanceSchema = new Schema( {
    name: {
        type: String,
        default: '',
        required: true,
        unique: true
    },
    description: {
        type: String,
        default: ''
    },
    ip: {
        type: String,
        default: ''
    },
    stacks: [{
        type: Schema.ObjectId,
        ref: 'Stack',
        childPath: 'instances'
    }],
    deploys: [{
        type: Schema.ObjectId,
        ref: 'Deploy'
    }]
} );

InstanceSchema.plugin( uniqueValidator );

InstanceSchema.plugin( relationship, {
    relationshipPathName: 'stacks'
} );

mongoose.model( 'Instance', InstanceSchema );