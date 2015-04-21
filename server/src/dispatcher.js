var utils = require( './utils.js' );

var _ = require( 'lodash' );

var sparks = [];

module.exports = {
    init: function(primus) {
        //
        // Listen for connections and echo the events send.
        //
        primus.on( 'connection', function(spark) {
            utils.log( 'Client connected: ' + spark.id, true );
            sparks.push( spark );
            spark.on( 'data', function(data) {
                console.log( spark.id, 'received message: ', data );
                spark.write( data );
            } );
        } );

        primus.on( 'disconnection', function(spark) {
            sparks.splice( sparks.indexOf( spark ), 1 );
            utils.log( 'Client disconnected: ' + spark.id, true );
        } );
    },

    broadcast: function(data) {
        utils.log( 'Starting push to clients ...' );
        _.each( sparks, function(spark) {
            spark.write( data );
        } );
    }
};