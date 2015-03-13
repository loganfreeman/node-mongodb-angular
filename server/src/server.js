/**
 *
 * @author scheng
 * @module
 */

var express = require( 'express' );

var app = express();

module.exports = app;

var favicon = require( 'serve-favicon' );

var logger = require( 'morgan' );

var session = require( 'express-session' );

var bodyParser = require( 'body-parser' );

var winston = require( 'winston' ),
    expressWinston = require( 'express-winston' );

var methodOverride = require( 'method-override' );

// cookie session
app.use( session( {
    secret: 'sessionsecret'
} ) );

app.use( bodyParser.urlencoded( {
    extended: true
} ) );
app.use( bodyParser.json() );

// override with the X-HTTP-Method-Override header in the request
app.use( methodOverride( 'X-HTTP-Method-Override' ) );

app.use( favicon( __dirname + '/public/images/favicon.ico' ) );

app.use( '/', express.static( __dirname + '/public' ) );

app.use( '/dashboard', express.static( __dirname + '../../../dashboard/build' ) );

app.use( '/forza', express.static( __dirname + '../../../forza/dist' ) );


//Register ejs as .html. If we did
//not call this, we would need to
//name our views foo.ejs instead
//of foo.html. The __express method
//is simply a function that engines
//use to hook into the Express view
//system by default, so if we want
//to change "foo.ejs" to "foo.html"
//we simply pass _any_ function, in this
//case `ejs.__express`.

app.engine( '.html', require( 'ejs' ).__express );

//Optional since express defaults to CWD/views

app.set( 'views', __dirname + '/views' );

//Without this you would need to
//supply the extension to res.render()
//ex: res.render('users.html').
app.set( 'view engine', 'html' );

// http logger needs be added BEFORE routers
app.use( logger( 'dev' ) );

// load all routes in the routes directory
require( './routes' )( app );



// winston error logging, needs to be added AFTER the router and BEFORE custom errror handlers
app.use( expressWinston.errorLogger( {
    transports: [
        new winston.transports.Console( {
            json: true,
            colorize: true
        } )
    ]
} ) );


/// catch 404 and forward to error handler
app.use( function(req, res, next) {
    var err = new Error( 'Not Found' );
    err.status = 404;
    next( err );
} );

// development error handler
// will print stacktrace
if (app.get( 'env' ) === 'development') {
    app.use( function(err, req, res, next) {
        res.status( err.status || 500 );
        res.render( 'error', {
            message: err.message,
            error: err.statusCode
        } );
    } );
}

/* istanbul ignore next */
if (!module.parent) {
    require( './waterline/waterline-init.js' )( app );
    app.listen( 8081 );
    console.log( 'Express started on port 8081' );
}