var utils = require( './utils.js' );

var _ = require( 'lodash' );

var sparks = {};

var RandomDataGenerator = require( './random-data-generator' ).RandomDataGenerator;

var dataSource = new RandomDataGenerator();

module.exports = {
    init: function(primus) {
        //
        // Listen for connections and echo the events send.
        //
        primus.on( 'connection', function(spark) {
            utils.log( 'Client connected: ' + spark.id, 'green' );
            utils.log( 'Spark Query: ' + JSON.stringify( spark.query ), 'green' );
            sparks[spark.id] = spark;

            if (spark.query.type === 'chart') {
                dataSource.on( 'data', function(data) {
                    spark.write( data );
                } );
            } else {
                spark.on( 'data', function(data) {
                    console.log( spark.id, 'received message: ', data );
                    spark.write( data );

                } );
            }

        } );

        primus.on( 'disconnection', function(spark) {
            delete sparks[spark.id];
            utils.log( 'Client disconnected: ' + spark.id, 'green' );
        } );
    },

    broadcast: function(data) {
        utils.log( 'Starting push to clients ...', 'green' );
        for (var id in sparks) {
            sparks[id].write( data );
        }
    }
};