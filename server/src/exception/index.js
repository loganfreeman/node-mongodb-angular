var util = require( 'util' );

require( 'extend-error' );

function MyError(message) {
    Error.call( this ); //super constructor
    Error.captureStackTrace( this, this.constructor ); //super helper method to include stack trace in error object

    this.name = this.constructor.name; //set our function’s name as error name.
    this.message = message; //set the error message
}

// inherit from Error
util.inherits( MyError, Error );


var AppError = Error.extend( 'AppError', 500 );
var ClientError = Error.extend( 'ClientError', 400 );

var HttpNotFound = ClientError.extend( 'HttpNotFoundError', 404 );
var HttpUnauthorized = ClientError.extend( 'HttpUnauthorized', 401 );
var HttpConflict = ClientError.extend( 'HttpConflict', 409 ); //unique constraint error
var HttpForbidden = ClientError.extend( 'HttpForbidden', 403 );

var NullReferenceError = Error.extend( 'ClientError', 400 );
var ObjectNotFoundError = Error.extend( 'ClientError', 400 );
var DuplicateKeyError = Error.extend( 'ClientError', 400 );



function ZabbixError(msg) {
    if (!(this instanceof ZabbixError)) {
        return new ZabbixError( msg );
    }
    Error.apply( this, [].slice.call( arguments ) );
    Error.captureStackTrace( this, this.constructor );
    this.message = msg;
    this.name = 'ZabbixError';
}

util.inherits( ZabbixError, Error );

function ZabbixRPCError(errorObject) {
    ZabbixError.call( this, errorObject.message );
    this.message = errorObject.message;
    this.description = errorObject.data;
    this.code = errorObject.code;
    this.name = 'ZabbixRPCError';
}

util.inherits( ZabbixRPCError, ZabbixError );


module.exports = {
    AppError: AppError,
    ClientError: ClientError,
    MyError: MyError,
    ZabbixError: ZabbixError,
    ZabbixRPCError: ZabbixRPCError,
    HttpNotFound: HttpNotFound,
    HttpUnauthorized: HttpUnauthorized,
    HttpForbidden: HttpForbidden,
    HttpConflict: HttpConflict,
    NullReferenceError: NullReferenceError,
    ObjectNotFoundError: ObjectNotFoundError,
    DuplicateKeyError: DuplicateKeyError
};