/**
 *
 *
 *
 * @author scheng
 * @module instanceController
 */


var schema = require( '../jugglingdb/init.js' );

var Promise = require( 'bluebird' );

var _ = require( 'lodash' );

var where = require( '../utils.js' ).where;




module.exports = {


    getInstances: function() {
        return new Promise( function(resolve, reject) {
                schema['instance'].all( function(err, models) {
                    if (err) {
                        reject( err );
                    } else {
                        resolve( models );
                    }
                } );
            } );
    },


    getInstancesByStack: function(stackId) {
        return new Promise( function(resolve, reject) {

                schema['instance'].all( where( 'stack_id', stackId ), function(err, models) {
                    if (err) {
                        reject( err );
                    } else {
                        resolve( models );
                    }
                } );
            } );
    }



};