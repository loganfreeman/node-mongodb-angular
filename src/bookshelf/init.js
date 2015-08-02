
var connection = require( '../config/database.js' ).getAuthen();

var knex = require( 'knex' )( {
    client: 'pg',
    connection: {
        host: 'localhost',
        user: connection.username,
        password: connection.password,
        database: connection.database
    }
} );


var bookshelf = require( 'bookshelf' )( knex );

require( './schema' )( bookshelf );

module.exports = {
    knex: knex,
    bookshelf: bookshelf
};