#!/bin/env node
/**
 *
 * @author scheng
 * @module
 */

var config = require( './config/config.js' );

var uploadDirectory = process.env.OPENSHIFT_DATA_DIR || __dirname + config.upload_directory;

var express = require( 'express' );

// real time server
// 
var http = require( 'http' );
var Primus = require( 'primus' );

// instead of creating the server using express
// we create the server so we can run socket.io
var app = express();
var server = http.createServer( app );

module.exports = app;

var favicon = require( 'serve-favicon' );

var logger = require( 'morgan' );

var session = require( 'express-session' );

var bodyParser = require( 'body-parser' );

var winston = require( 'winston' ),
    expressWinston = require( 'express-winston' );

var methodOverride = require( 'method-override' );

var cors = require( 'cors' );

var mongoose = require( 'mongoose' );

var auth = require( './auth.js' );

// bootstrap mongoose models
require( './mongoose/models' );

// set up passport local Strategy
require( './config/pass.js' );

var utils = require( './utils.js' );

var passport = require( 'passport' ),
    LocalStrategy = require( 'passport-local' ).Strategy;





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
            secret: 'sessionsecret',
            resave: true,
            saveUninitialized: true
        } ) );
        console.log( 'Using cookie session store' );
        break;
}


app.use( passport.initialize() );
app.use( passport.session() );

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

app.use( '/', express.static( __dirname + '/../guide/dist' ) );

app.use( '/docs', express.static( __dirname + '/../swagger-ui/' ) );


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

app.use( '/devops', auth.ensureAuthenticated );

require( './resources/devops.js' )( swagger );

swagger.configureDeclaration( 'devops', {
    description: 'Operations about devops',
    protocols: ['http'],
    produces: ['application/json']
} );

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
var swaggerBaseUrl = config.getPublicUrl();
if (app.get( 'env' ) === 'development') {
    swaggerBaseUrl = config.getBaseUrl();
}
swagger.configure( swaggerBaseUrl, '1.0.0' );

/*// Serve up swagger ui at /docs via static route
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
} );*/



// winston error logging, needs to be added AFTER the router and BEFORE custom errror handlers
app.use( expressWinston.errorLogger( {
    transports: [
        new winston.transports.Console( {
            json: true,
            colorize: true
        } )
    ]
} ) );

//var primus = new Primus( server );

//require( './dispatcher.js' ).init( primus );


function start() {
    // require( './waterline/waterline-init.js' )( app );
    var port = config.getPort();
    var ipAddress = config.getHost();
    //app.listen( port );
    server.listen( port, ipAddress, function(){
         console.log('%s: Node server started on %s:%d ...',
                        Date(Date.now() ), ipAddress, port);
    } );
    
}

/* istanbul ignore next */
if (!module.parent) {
    start();
}