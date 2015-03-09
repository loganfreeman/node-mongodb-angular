angular.module( 'dashboard.pages' )
    .config( function($stateProvider) {
        $stateProvider
            .state( 'app.home', {
                url: '/',
                templateUrl: 'home/home.tpl.html'
            } );

    } );