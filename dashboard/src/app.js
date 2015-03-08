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


        // grid system
        skel.init( {
            reset: 'full',
            containers: '95%',
            breakpoints: {
                large: {
                    media: '(min-width: 1025px) and (max-width: 1280px)',
                    containers: 960
                },
                medium: {
                    media: '(min-width: 769px) and (max-width: 1024px)',
                    containers: '90%'
                },
                small: {
                    media: '(max-width: 768px)',
                    containers: '95%!'
                },
                xsmall: {
                    media: '(max-width: 640px)'
                },
                xxsmall: {
                    media: '(max-width: 480px)'
                }
            }
        } );
    } );

