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
    },

    /**
     * get deploys for an instance
     * @param  {Number}
     * @return {JSONArray}
     */
    getDeployByInstance: function(instance) {
        return new Promise( function(resolve, reject) {} );
    },

    /**
     * create a new deploy
     * @param  {json}
     * @return {Promise}
     */
    create: function(data) {

        return new Promise( function(resolve, reject) {
                schema['deploy'].create( data, function(err, model) {
                    if (err) {
                        reject( err );
                    } else {
                        resolve( model );
                    }
                } );
            } );
    }

};