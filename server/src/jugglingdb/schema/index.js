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

    // deploys belongs to instance
    schema['deploy'].belongsTo( schema['instance'], {
        foreignKey: 'instance_id',
        as: 'instance'
    } );

    schema['instance'].hasMany( schema['deploy'], {
        as: 'deploys',
        foreignKey: 'instance_id'
    } );


    // instance belongs to stack
    schema['instance'].belongsTo( schema['stack'], {
        foreignKey: 'stack_id',
        as: 'stack'
    } );

    schema['stack'].hasMany( schema['instance'], {
        as: 'instances',
        foreignKey: 'stack_id'
    } );

    // stack belongs to environment
    schema['stack'].belongsTo( schema['environment'], {
        foreignKey: 'environment_id',
        as: 'environment'
    } );

    schema['environment'].hasMany( schema['stack'], {
        as: 'stacks',
        foreignKey: 'environment_id'
    } );
};