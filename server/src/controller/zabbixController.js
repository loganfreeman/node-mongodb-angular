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

    getApplication: function(options) {
        return new Promise( function(resolve, reject) {
                api.request( 'application.get', options, function(err, res) {
                    if (err) {
                        reject( err );
                    } else {
                        resolve( res );
                    }
                } );
            } );
    },

    applicationExists: function(options) {
        return new Promise( function(resolve, reject) {
                api.request( 'application.exists', options, function(err, res) {
                    if (err) {
                        reject( err );
                    } else {
                        resolve( res );
                    }
                } );
            } );
    },
    getItem: function(options) {
        return new Promise( function(resolve, reject) {
                api.request( 'item.get', options, function(err, res) {
                    if (err) {
                        reject( err );
                    } else {
                        resolve( res );
                    }
                } );
            } );
    },

    itemExists: function(options) {
        return new Promise( function(resolve, reject) {
                api.request( 'item.exists', options, function(err, res) {
                    if (err) {
                        reject( err );
                    } else {
                        resolve( res );
                    }
                } );
            } );
    },

    getMaintenance: function(options) {
        return new Promise( function(resolve, reject) {
                api.request( 'maintenance.get', options, function(err, res) {
                    if (err) {
                        reject( err );
                    } else {
                        resolve( res );
                    }
                } );
            } );
    },

    maintenanceExists: function(options) {
        return new Promise( function(resolve, reject) {
                api.request( 'maintenance.exists', options, function(err, res) {
                    if (err) {
                        reject( err );
                    } else {
                        resolve( res );
                    }
                } );
            } );
    },

    getHostInterface: function(options) {
        return new Promise( function(resolve, reject) {
                api.request( 'hostinterface.get', options, function(err, res) {
                    if (err) {
                        reject( err );
                    } else {
                        resolve( res );
                    }
                } );
            } );
    },

    hostInterfaceExists: function(options) {
        return new Promise( function(resolve, reject) {
                api.request( 'hostinterface.exists', options, function(err, res) {
                    if (err) {
                        reject( err );
                    } else {
                        resolve( res );
                    }
                } );
            } );
    },

    getHostGroup: function(options) {
        return new Promise( function(resolve, reject) {
                api.request( 'hostgroup.get', options, function(err, res) {
                    if (err) {
                        reject( err );
                    } else {
                        resolve( res );
                    }
                } );
            } );
    },
    hostGroupExists: function(filter) {
        return new Promise( function(resolve, reject) {
                api.request( 'hostgroup.exists', filter, function(err, res) {
                    if (err) {
                        reject( err );
                    } else {
                        resolve( res );
                    }
                } );
            } );
    },
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
    },

    checkHost: function(filter) {
        return new Promise( function(resolve, reject) {
                api.request( 'host.exists', filter, function(err, res) {
                    if (err) {
                        reject( err );
                    } else {
                        resolve( res );
                    }
                } );
            } );
    },

    getHost: function(options) {
        return new Promise( function(resolve, reject) {
                api.request( 'host.get', options, function(err, res) {
                    if (err) {
                        reject( err );
                    } else {
                        resolve( res );
                    }
                } );
            } );

    }

};