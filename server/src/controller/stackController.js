/**
 *
 *
 *
 * @author scheng
 * @module stackController
 */


var schema = require( '../jugglingdb/init.js' );

var Promise = require( 'bluebird' );

var _ = require( 'lodash' );




module.exports = {


    getStacks: function() {
        return new Promise( function(resolve, reject) {
                schema['stack'].all( function(err, models) {
                    if (err) {
                        reject( err );
                    } else {
                        resolve( models );
                    }
                } );
            } );
    },


    getStacksByEnv: function(envId) {
        var params = {};
        params.where = {
            environment_id: envId
        };
        return new Promise( function(resolve, reject) {
                schema['stack'].all( params, function(err, models) {
                    if (err) {
                        reject( err );
                    } else {
                        resolve( models );
                    }
                } );
            } );
    }

};