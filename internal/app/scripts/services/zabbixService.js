angular.module( 'angularPassportService' )
    .factory( 'zabbixService', function($location, $rootScope, $cookieStore, $http, $q) {



        return {
            getItems: function(hostid) {
                return $http.post( '/zabbix/item/get', {
                    'output': 'extend',
                    'hostids': hostid
                } );
            },

            getItem: function(itemId) {
                return $http.post( '/zabbix/item/get', {
                    'output': 'extend',
                    'itemids': itemId
                } );
            },

            getHostInterfaces: function(options) {
                return $http.post( '/zabbix/hostinterface/get', options );
            },

            getHostGroups: function(options) {
                return $http.post( '/zabbix/hostgroup/get', options );
            },

            getHosts: function(options) {
                return $http.post( '/zabbix/host/get', options );
            }
        };
    } );