var schema = require( '../jugglingdb/init.js' );

var Promise = require( 'bluebird' );

var _ = require( 'lodash' );


module.exports = {


    getEnvironments: function() {
        return new Promise( function(resolve, reject) {
                schema['environment'].all( function(err, models) {
                    if (err) {
                        reject( err );
                    } else {
                        resolve( models );
                    }
                } );
            } );
    },


    create: function(instance) {
        return new Promise( function(resolve, reject) {
                schema['environment'].create( instance, function(err, model) {
                    if (err) {
                        reject( err );
                    } else {
                        resolve( model );
                    }
                } );
            } );
    }

};