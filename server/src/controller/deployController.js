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
        var params = {};
        params.where = {
            instance_id: instance
        };
        return new Promise( function(resolve, reject) {
                schema['deploy'].all( params, function(err, models) {
                    if (err) {
                        reject( err );
                    } else {
                        resolve( models );
                    }
                } );
            } );
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