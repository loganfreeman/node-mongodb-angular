var mongoose = require( 'mongoose' ),
    Promise = mongoose.Promise,
    Schema = mongoose.Schema;


/**
 * Schema definition.
 */

var DrumsetSchema = new Schema( {
    brand: String,
    color: String,
    type: String,
    model: String
} );

/**
 * Schema methods.
 */

DrumsetSchema.statics.useQuery = function() {
    // return a Query
    return this.find( {
        color: 'black'
    } ).sort( '_id' );
};

DrumsetSchema.statics.usePromise = function() {
    var promise = new Promise();
    this.find( {
        type: 'Acoustic'
    } )
        .sort( '_id' )
        .exec( promise.resolve.bind( promise ) );
    return promise;
};

DrumsetSchema.statics.queryError = function() {
    // should produce an invalid query error
    return this.find( {
        color: {
            $fake: {
                $boom: []
            }
        }
    } ).sort( '_id' );
};

DrumsetSchema.statics.promiseError = function() {
    var promise = new Promise;
    promise.error( new Error( 'splat!' ) );
    return promise;
};

DrumsetSchema.statics.usePromiseRedirect = function(status) {
    var url = '/promise/redirect';
    var promise = new Promise;
    process.nextTick( function() {
        promise.complete( url, status );
    } );
    return promise;
};

mongoose.model( 'Drumset', DrumsetSchema );