angular.module( 'dashboard', [
    'ui.router',
    'dashboard.pages',
    'loginService'
] )
    .config( function($urlRouterProvider) {
        $urlRouterProvider.otherwise( '/' );
    } )
    .controller( 'BodyController', function($scope, $state, $stateParams, $http, $timeout, loginService) {
        // controller for the root scope

        // Expose $state and $stateParams to the <body> tag
        $scope.$state = $state;
        $scope.$stateParams = $stateParams;

        // login service on the root scope
        $scope.ls = loginService;
        $scope.login = {
            working: false,
            wrong: false
        };
        $scope.loginMe = function() {
            // setup promise, and 'working' flag
            var loginPromise = $http.post( '/login', $scope.login );
            $scope.login.working = true;
            $scope.login.wrong = false;

            loginService.loginUser( loginPromise );
            loginPromise.error( function() {
                $scope.login.wrong = true;
                $timeout( function() {
                    $scope.login.wrong = false;
                }, 8000 );
            } );
            loginPromise.finally( function() {
                $scope.login.working = false;
            } );
        };
        $scope.logoutMe = function() {
            loginService.logoutUser( $http.get( '/logout' ) );
        };
    } )
    .run( function($rootScope) {

        /**
         * $rootScope.doingResolve is a flag useful to display a spinner on changing states.
         * Some states may require remote data so it will take awhile to load.
         */
        var resolveDone = function() {
            $rootScope.doingResolve = false;
        };
        $rootScope.doingResolve = false;

        $rootScope.$on( '$stateChangeStart', function() {
            $rootScope.doingResolve = true;
        } );
        $rootScope.$on( '$stateChangeSuccess', resolveDone );
        $rootScope.$on( '$stateChangeError', resolveDone );
        $rootScope.$on( '$statePermissionError', resolveDone );


        // grid system
        skel.init( {
            reset: 'full',
            containers: '95%',
            breakpoints: {
                large: {
                    media: '(min-width: 1025px) and (max-width: 1280px)',
                    containers: '90%'
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

