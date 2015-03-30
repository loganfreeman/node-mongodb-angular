/**
 *
 *
 * @author scheng
 * @module zabbixController
 * @description zabbix controller for proxying zabbix API
 */


var config = require( '../config/config.js' );

var Promise = require( 'bluebird' );

var _ = require( 'lodash' );

var ZabbixApi = require( 'zabbix-api' );

var api = new ZabbixApi( config.zabbix.username, config.zabbix.password, config.zabbix.api_url );

module.exports = {
    getHistory: function(options) {
        return new Promise( function(resolve, reject) {
                api.request( 'history.get', options, function(err, res) {
                    if (err) {
                        reject( err );
                    } else {
                        resolve( res );
                    }
                } );
            } );
    },

    getEvent: function(options) {
        return new Promise( function(resolve, reject) {
                api.request( 'event.get', options, function(err, res) {
                    if (err) {
                        reject( err );
                    } else {
                        resolve( res );
                    }
                } );
            } );
    },

    /**
     * return the availability of IT services
     * @param  {string or array} serviceId IDs of the IT services
     * @param  {array} interval  array of intervals
     * @return {Object}           json
     */
    getServiceAvailability: function(serviceIds, intervals) {
        return new Promise( function(resolve, reject) {
                api.request( 'service.getsla', {
                    serviceids: serviceIds,
                    intervals: intervals
                }, function(err, res) {
                        if (err) {
                            reject( err );
                        } else {
                            resolve( res );
                        }
                    } );
            } );
    }

};