var bookshelf = require( '../config/bookshelf.js' ).bookshelf;

var User = bookshelf.Model.extend( {
    tableName: 'users'
} );

module.exports = {
    User: User
};