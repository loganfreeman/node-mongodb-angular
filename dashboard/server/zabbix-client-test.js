var config = require( './config.js' );
var Zabbix = require( 'zabbix-api' );
var zbx = new Zabbix( config.zabbix.username, config.zabbix.password, config.zabbix.api_url );

var ZabbixClient = require( './zabbix-client.js' );

var logger = require( 'tracer' ).colorConsole();

zbx.login( function(err, auth_token) {
    console.log( 'Authorization token: ' + auth_token );
} );




var zabbix = new ZabbixClient( config.zabbix.api_url, config.zabbix.username, config.zabbix.password );

zabbix.getApiVersion( function(err, resp, body) {
    if (!err) {
        console.log( 'Unauthenticated API version request, and the version is: ' + body.result );
    } else {
        logger.error( err );
    }
} );