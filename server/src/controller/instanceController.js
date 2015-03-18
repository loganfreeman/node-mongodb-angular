var schema = require( '../jugglingdb/init.js' );

var Promise = require( 'bluebird' );

var _ = require( 'lodash' );




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
    }

};