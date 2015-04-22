angular.module( 'angularPassportService' )
    .factory( 'zabbixService', function($location, $rootScope, $cookieStore, $http, $q) {



        return {
            getItems: function(hostid) {
                return $http.post( '/zabbix/item/get', {
                    'output': 'extend',
                    'hostids': hostid
                } );
            },

            getHostInterfaces: function(options) {
                return $http.post( '/zabbix/hostinterface/get', options );
            },

            getHostGroups: function(options) {
                return $http.post( '/zabbix/hostgroup/get', options );
            }
        };
    } );