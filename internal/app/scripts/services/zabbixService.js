angular.module( 'angularPassportService' )
    .factory( 'zabbixService', function($location, $rootScope, $cookieStore, $http, $q) {



        return {
            getItems: function(itemids) {
                return $http.post( '/zabbix/item/get', {
                    'output': ['name', 'value_type', 'units', 'key_'],
                    'itemids': itemids
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