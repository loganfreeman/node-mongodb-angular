var mongoose = require( 'mongoose' ),
    Promise = mongoose.Promise,
    Schema = mongoose.Schema;



var StackInstanceSchema = new Schema( {
    stack: {
        type: Schema.ObjectId,
        ref: 'Stack'
    },
    instance: {
        type: Schema.ObjectId,
        ref: 'Instance'
    }
} );


mongoose.model( 'StackInstance', StackInstanceSchema );