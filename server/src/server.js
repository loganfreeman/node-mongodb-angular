/**
 *
 * @author scheng
 * @module
 */

var config = require( './config/config.js' );

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

var cors = require( 'cors' );



switch (config.sessionStore()) {
    case 'redis':
        var RedisStore = require( 'connect-redis' )( session );

        app.use( session( {
            store: new RedisStore( config.redis ),
            secret: 'sessionsecret'
        } ) );
        console.log( 'Using redis session store' );
        break;
    default:
        // cookie session
        app.use( session( {
            secret: 'sessionsecret'
        } ) );
        console.log( 'Using cookie session store' );
        break;
}

app.use( bodyParser.urlencoded( {
    extended: true
} ) );
app.use( bodyParser.json() );

// enable all cors requests
var corsOptions = {
    credentials: true,
    origin: true,
    methods: ['GET', 'POST', 'OPTIONS', 'PUT']
};
app.use( cors( corsOptions ) );

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

// swagger config
var swagger = require( 'swagger-node-express' ).createNew( app );

require( './swagger/models.js' )( swagger );

require( './swagger/resources.js' )( swagger );




/*swagger.configureDeclaration( 'zabbix', {
    description: 'Operations about zabbix',
    // authorizations: ['oauth2'],
    produces: ['application/json']
} );*/



// set api info
swagger.setApiInfo( {
    title: 'Devops Restful API'
} );

/*swagger.setAuthorizations( {
    apiKey: {
        type: 'apiKey',
        passAs: 'header'
    }
} );*/

// Configures the app's base path and api version.
// swagger.configureSwaggerPaths( '', 'api-docs', '' );
swagger.configure( config.getBaseUrl(), '1.0.0' );

// Serve up swagger ui at /docs via static route
var docs_handler = express.static( __dirname + '/../swagger-ui/' );
app.get( /^\/docs(\/.*)?$/, function(req, res, next) {
    if (req.url === '/docs') { // express static barfs on root url w/o trailing slash
        res.writeHead( 302, {
            'Location': req.url + '/?url=' + config.getBaseUrl() + '/api-docs.json'
        } );
        res.end();
        return;
    }
    // take off leading /docs so that connect locates file correctly
    req.url = req.url.substr( '/docs'.length );
    return docs_handler( req, res, next );
} );



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


function start() {
    // require( './waterline/waterline-init.js' )( app );
    var port = config.getPort();
    app.listen( port );
    console.log( 'Express started on port ' + port );
}

/* istanbul ignore next */
if (!module.parent) {
    start();
}