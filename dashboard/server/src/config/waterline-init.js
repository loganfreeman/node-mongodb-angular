
var Waterline = require( 'waterline' );
// Instantiate a new instance of the ORM
var orm = new Waterline();

module.exports = function(app) {
    // TODO: initilize waterline
    // Require any waterline compatible adapters here
    var diskAdapter = require( 'sails-disk' ),
        mysqlAdapter = require( 'sails-mysql' ),
        myLocalPostgres = require( 'sails-postgresql' );
    // Build A Config Object
    var config = {

        // Setup Adapters
        // Creates named adapters that have have been required
        adapters: {
            'default': diskAdapter,
            disk: diskAdapter,
            mysql: mysqlAdapter,
            postgresql: myLocalPostgres
        },

        // Build Connections Config
        // Setup connections using the named adapter configs
        connections: {
            myLocalDisk: {
                adapter: 'disk'
            },

            myLocalMySql: {
                adapter: 'mysql',
                host: 'localhost',
                database: 'foobar'
            },
            myLocalPostgres: {
                adapter: 'postgresql',
                database: 'todo',
                host: 'localhost',
                user: 'michael',
                password: 'root',
                port: 5432,
                pool: false,
                ssl: false
            }
        },

        defaults: {
            migrate: 'alter'
        }

    };

    var User = Waterline.Collection.extend( {

        identity: 'users',
        connection: 'myLocalPostgres',

        attributes: {

            firstName: {
                type: 'string',
                required: true
            },

            lastName: {
                type: 'string',
                required: true,
            }
        }
    } );

    // Load the Models into the ORM
    orm.loadCollection( User );

    // Start Waterline passing adapters in
    orm.initialize( config, function(err, models) {
        if (err) {
            console.log( err );
            throw err;
        }

        app.models = models.collections;
        app.connections = models.connections;

        console.log( 'waterline initilized' );
    } );
};