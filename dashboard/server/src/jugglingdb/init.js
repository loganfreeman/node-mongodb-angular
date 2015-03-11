var Schema = require( 'jugglingdb' ).Schema;
var schema = new Schema( 'postgres', {
    database: 'todo',
    host: 'localhost',
    port: 5432,
    username: 'michael',
    password: 'root',
    debug: true
} );

require('./schema')(schema);

module.exports = schema;