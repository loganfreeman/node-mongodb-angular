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
                        Promise.resolve( models )
                            .map( function(model) {
                                return new Promise( function(resolve, reject) {
                                        model.instances( function(err, instances) {
                                            // model.$instances = instances;
                                            if (err) {
                                                reject( err );
                                            } else {
                                                resolve( model );
                                            }
                                        } );
                                    } );
                            } )
                            .then( function(promises) {
                                Promise.all( promises )
                                    .then( function(stacks) {
                                        resolve( stacks );
                                    } );
                            } );
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