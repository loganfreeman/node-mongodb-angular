angular.module( 'dashboard.page', ['ui.router', 'templates-app', 'ui.bootstrap', 'ngAside'] )
    .config( function($stateProvider) {
        $stateProvider
            .state( 'app', {
                abstract: true,
                template: '<ui-view></ui-view>'
            } );
    } );