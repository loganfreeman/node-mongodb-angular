var config = require( '../config/config.js' );

var Promise = require( 'bluebird' );

var _ = require( 'lodash' );

var chargify = require( 'chargify' );

var chargify_site = chargify( config.chargify.site, config.chargify.key );


module.exports = {
    getCustomers: function() {
        return new Promise( function(resolve, reject) {
                chargify_site.get( 'customers.json', function(err, res, body) {
                    if (err) {
                        reject( err );
                    } else {
                        resolve( body );
                    }
                } );
            } );
    }
};