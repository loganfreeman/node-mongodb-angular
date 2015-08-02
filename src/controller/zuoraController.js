var config = require( '../config/config.js' );

var Promise = require( 'bluebird' );

var _ = require( 'lodash' );

var zuora = require( 'zuora' );

var zuoraSecret = require( '../../zuora.js' );

var client = zuora.create( zuoraSecret );

module.exports = {
    getAccount: function(id) {
        return new Promise( function(resolve, reject) {
                client.account.get( id, function(err, models) {
                    if (err) {
                        reject( err );
                    } else {
                        resolve( models );
                    }
                } );
            } );
    },

    getCatalog: function() {
        return new Promise( function(resolve, reject) {
                client.catalog.get( function(err, models) {
                    if (err) {
                        reject( err );
                    } else {
                        resolve( models );
                    }
                } );
            } );
    }
};