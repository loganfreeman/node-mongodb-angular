var Schema = require( 'jugglingdb' ).Schema;

var connection = require( '../config/database.js' ).getAuthen();

var schema = new Schema( 'postgres', {
    database: connection.database,
    host: 'localhost',
    port: 5432,
    username: connection.username,
    password: connection.password,
    debug: true
} );

require( './schema' )( schema );

module.exports = schema;