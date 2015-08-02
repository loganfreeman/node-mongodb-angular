var Schema = require( 'jugglingdb' ).Schema;

var connection = require( '../config/database.js' ).getAuthen();

var schema = new Schema( 'postgres', {
    database: connection.database,
    host: 'localhost',
    port: connection.port,
    username: connection.username,
    password: connection.password,
    debug: true
} );

console.log('initilizing postgres database connection: ' + connection.username + '@localhost:' + connection.port);

require( './schema' )( schema );

module.exports = schema;