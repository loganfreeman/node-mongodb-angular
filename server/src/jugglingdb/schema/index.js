/**
 *
 * @author scheng
 * @module schema
 */


var fs = require( 'fs' ),
    path = require( 'path' );


module.exports = function(schema) {
    fs.readdirSync( __dirname )
        .filter( function(file) {
            return ((file.indexOf( '.' ) !== 0) && (file !== 'index.js') && (file.slice( -3 ) == '.js'));
        } )
        .forEach( function(file) {
            require( './' + file )( schema );
        } );


    // define relations


};