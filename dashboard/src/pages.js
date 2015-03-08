angular.module( 'dashboard.pages', ['dashboard.page', 'dashboard.user'] )
    .config( function($stateProvider) {
        $stateProvider
            .state( 'app.admin', {
                url: '/admin',
                templateUrl: 'pages/admin.tpl.html',
                controller: 'adminController'
            } )
            .state( 'app.user', {
                url: '/user',
                templateUrl: 'pages/user.tpl.html',
                controller: 'userController'
            } )
            .state( 'app.home', {
                url: '/',
                templateUrl: 'home/home.tpl.html'
            } );
    } )
    .controller( 'adminController', function($scope) {
        $( '[data-toggle="offcanvas"]' ).click( function() {
            $( '.row-offcanvas' ).toggleClass( 'active' );
        } );
    } );