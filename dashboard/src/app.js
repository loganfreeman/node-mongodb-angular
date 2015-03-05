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
    } );

