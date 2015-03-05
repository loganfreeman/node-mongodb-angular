angular.module( 'dashboard.page', ['ui.router', 'templates-app'] )
    .config( function($stateProvider) {
        $stateProvider
            .state( 'app', {
                abstract: true,
                template: '<ui-view></ui-view>'
            } );
    } );