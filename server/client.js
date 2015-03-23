var Promise = require( 'bluebird' );
var request = Promise.promisify( require( 'request' ) );
// request.debug = true;

var queryString = require( 'querystring' );


var postData = {
    username: 'scheng',
    password: '@33yyy'
};

var body = queryString.stringify( postData );

var options = {
    url: 'http://localhost:8081/login',
    body: body,
    method: 'POST',
    headers: {
        'content-type': 'application/x-www-form-urlencoded'
    },
};

request( options )
    .spread( function(res, body) {
        console.log( body );
    } )
    .catch( function(err) {
        console.log( err );
    } );