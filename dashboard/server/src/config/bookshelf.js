var knex = require( 'knex' )( {
    client: 'pg',
    connection: {
        host: 'localhost',
        user: 'michael',
        password: 'root',
        database: 'todo'
    }
} );


var bookshelf = require( 'bookshelf' )( knex );

module.exports = {
    knex: knex,
    bookshelf: bookshelf
};