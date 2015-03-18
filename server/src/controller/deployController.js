var schema = require( '../jugglingdb/init.js' );

var Promise = require( 'bluebird' );

var _ = require( 'lodash' );


module.exports = {


    getDeploys: function() {
        return new Promise( function(resolve, reject) {
                schema['deploy'].all( function(err, models) {
                    if (err) {
                        reject( err );
                    } else {
                        resolve( models );
                    }
                } );
            } );
    }

};