angular.module( 'dashboard', [
    'ui.router',
    'dashboard.pages'
] )
    .config( function($urlRouterProvider) {
        $urlRouterProvider.otherwise( '/' );
    } )
    .controller( 'BodyController', function($scope, $state, $stateParams, $http, $timeout) {
        // controller for the root scope

        // Expose $state and $stateParams to the <body> tag
        $scope.$state = $state;
        $scope.$stateParams = $stateParams;
    } )
    .run( function($rootScope) {
        skel.init( {
            reset: 'full',
            containers: '95%',
            breakpoints: {
                medium: {
                    media: '(min-width: 769px) and (max-width: 1024px)'
                },
                small: {
                    media: '(max-width: 768px)'
                }
            }
        } );
    } );

