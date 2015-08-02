var fs = require( 'fs' ),
    path = require( 'path' );

var mongoose = require( 'mongoose' );

// Bootstrap models
fs.readdirSync( __dirname )
    .filter( function(file) {
        return ((file.indexOf( '.' ) !== 0) && (file !== 'index.js') && (file.slice( -3 ) == '.js'));
    } )
    .forEach( function(file) {
        require( __dirname + '/' + file );
    } );

module.exports = {
    User: mongoose.model( 'User' ),
    Environment: mongoose.model( 'Environment' ),
    Deploy: mongoose.model( 'Deploy' ),
    Instance: mongoose.model( 'Instance' ),
    Stack: mongoose.model( 'Stack' ),
    Group: mongoose.model( 'Group' )
};