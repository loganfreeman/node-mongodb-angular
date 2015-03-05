angular.module( 'dashboard.pages', ['dashboard.page'] )
    .config( function($stateProvider) {
        $stateProvider
            .state( 'app.admin', {
                url: '/admin',
                templateUrl: 'pages/admin.tpl.html'
            } )
            .state( 'app.user', {
                url: '/user',
                templateUrl: 'pages/user.tpl.html'
            } )
            .state( 'app.home', {
                url: '/',
                templateUrl: 'home/home.tpl.html'
            } );
    } );