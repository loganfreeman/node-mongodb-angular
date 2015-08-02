'use strict';

angular.module( 'angularPassportService' )
    .factory( 'Admin', function($resource) {
        return $resource( '/auth/admin/users/:id/', {}, {
            'update': {
                method: 'PUT'
            }
        } );
    } );