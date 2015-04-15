'use strict';

angular
    .module( 'themesApp', [
        'easypiechart',
        'toggle-switch',
        'ui.bootstrap',
        'ui.tree',
        'ui.select2',
        'ngGrid',
        'xeditable',
        'flow',
        'theme.services',
        'theme.directives',
        'theme.navigation-controller',
        'theme.messages-controller',
        'theme.layout-horizontal',
        'theme.layout-boxed',
        'theme.vector_maps',
        'theme.calendars',
        'theme.gallery',
        'theme.tasks',



        'theme.pages-controllers',
        'theme.dashboard',
        'theme.templates',
        'theme.template-overrides',
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngRoute',
        'ngAnimate',
        'http-auth-interceptor',
        'angularPassportService',
        'notificationWidget'
        ] )
    .controller( 'MainController', ['$scope', '$global', '$timeout', 'progressLoader', '$location', 'Auth',

        // MainController
        function($scope, $global, $timeout, progressLoader, $location, Auth) {
            $scope.style_fixedHeader = $global.get( 'fixedHeader' );
            $scope.style_headerBarHidden = $global.get( 'headerBarHidden' );
            $scope.style_layoutBoxed = $global.get( 'layoutBoxed' );
            $scope.style_fullscreen = $global.get( 'fullscreen' );
            $scope.style_leftbarCollapsed = $global.get( 'leftbarCollapsed' );
            $scope.style_leftbarShown = $global.get( 'leftbarShown' );
            $scope.style_rightbarCollapsed = $global.get( 'rightbarCollapsed' );
            $scope.style_isSmallScreen = false;
            $scope.style_showSearchCollapsed = $global.get( 'showSearchCollapsed' );
            $scope.style_layoutHorizontal = $global.get( 'layoutHorizontal' );


            /**
             * logOut
             */
            $scope.logOut = function() {
                Auth.logout( function() {
                    $location.path( '/extras-login2' );
                } );
            };

            $scope.hideSearchBar = function() {
                $global.set( 'showSearchCollapsed', false );
            };

            $scope.hideHeaderBar = function() {
                $global.set( 'headerBarHidden', true );
            };

            $scope.showHeaderBar = function($event) {
                $event.stopPropagation();
                $global.set( 'headerBarHidden', false );
            };

            $scope.toggleLeftBar = function() {
                if ($scope.style_isSmallScreen) {
                    return $global.set( 'leftbarShown', !$scope.style_leftbarShown );
                }
                $global.set( 'leftbarCollapsed', !$scope.style_leftbarCollapsed );
            };

            $scope.toggleRightBar = function() {
                $global.set( 'rightbarCollapsed', !$scope.style_rightbarCollapsed );
            };

            $scope.$on( 'globalStyles:changed', function(event, newVal) {
                $scope['style_' + newVal.key] = newVal.value;
            } );
            $scope.$on( 'globalStyles:maxWidth767', function(event, newVal) {
                $timeout( function() {
                    $scope.style_isSmallScreen = newVal;
                    if (!newVal) {
                        $global.set( 'leftbarShown', false );
                    } else {
                        $global.set( 'leftbarCollapsed', false );
                    }
                } );
            } );

            $scope.rightbarAccordionsShowOne = false;
            $scope.rightbarAccordions = [{
                open: true
                }, {
                open: true
                }, {
                open: true
                }, {
                open: true
                }, {
                open: true
                }, {
                open: true
                }, {
                open: true
            }];

            $scope.$on( '$routeChangeStart', function(e) {
                // console.log('start: ', $location.path());
                progressLoader.start();
                progressLoader.set( 50 );
            } );
            $scope.$on( '$routeChangeSuccess', function(e) {
                // console.log('success: ', $location.path());
                progressLoader.end();
            } );
    }] )
    .config( ['$provide', '$routeProvider', '$locationProvider', function($provide, $routeProvider, $locationProvider) {
            $routeProvider
                .when( '/', {
                    templateUrl: 'views/index.html'
                } )
                .when( '/calendar', {
                    templateUrl: 'views/calendar.html',
                    resolve: {
                        lazyLoad: ['lazyLoad', function(lazyLoad) {
                                return lazyLoad.load( [
                                    'assets/plugins/fullcalendar/fullcalendar.js'
                                ] );
                        }]
                    }
                } )
                .when( '/form-ckeditor', {
                    templateUrl: 'views/form-ckeditor.html',
                    resolve: {
                        lazyLoad: ['lazyLoad', function(lazyLoad) {
                                return lazyLoad.load( [
                                    'assets/plugins/form-ckeditor/ckeditor.js',
                                    'assets/plugins/form-ckeditor/lang/en.js'
                                ] );
                        }]
                    }
                } )
                .when( '/form-imagecrop', {
                    templateUrl: 'views/form-imagecrop.html',
                    resolve: {
                        lazyLoad: ['lazyLoad', function(lazyLoad) {
                                return lazyLoad.load( [
                                    'assets/plugins/jcrop/js/jquery.Jcrop.js'
                                ] );
                        }]
                    }
                } )
                .when( '/form-wizard', {
                    templateUrl: 'views/form-wizard.html',
                    resolve: {
                        lazyLoad: ['lazyLoad', function(lazyLoad) {
                                return lazyLoad.load( [
                                    'bower_components/jquery-validation/dist/jquery.validate.js',
                                    'bower_components/stepy/lib/jquery.stepy.js'
                                ] );
                        }]
                    }
                } )
                .when( '/form-masks', {
                    templateUrl: 'views/form-masks.html',
                    resolve: {
                        lazyLoad: ['lazyLoad', function(lazyLoad) {
                                return lazyLoad.load( [
                                    'bower_components/jquery.inputmask/dist/jquery.inputmask.bundle.js'
                                ] );
                        }]
                    }
                } )
                .when( '/maps-vector', {
                    templateUrl: 'views/maps-vector.html',
                    resolve: {
                        lazyLoad: ['lazyLoad', function(lazyLoad) {
                                return lazyLoad.load( [
                                    'bower_components/jqvmap/jqvmap/maps/jquery.vmap.europe.js',
                                    'bower_components/jqvmap/jqvmap/maps/jquery.vmap.usa.js'
                                ] );
                        }]
                    }
                } )
                .when( '/charts-canvas', {
                    templateUrl: 'views/charts-canvas.html',
                    resolve: {
                        lazyLoad: ['lazyLoad', function(lazyLoad) {
                                return lazyLoad.load( [
                                    'bower_components/Chart.js/Chart.min.js'
                                ] );
                        }]
                    }
                } )
                .when( '/charts-svg', {
                    templateUrl: 'views/charts-svg.html',
                    resolve: {
                        lazyLoad: ['lazyLoad', function(lazyLoad) {
                                return lazyLoad.load( [
                                    'bower_components/raphael/raphael.js',
                                    'bower_components/morris.js/morris.js'
                                ] );
                        }]
                    }
                } )
                .when( '/:templateFile', {
                    templateUrl: function(param) {
                        return 'views/' + param.templateFile + '.html';
                    },
                    accessLevel: 'public'
                } )
                .otherwise( {
                    redirectTo: '/'
                } );
            //$locationProvider.html5Mode(true);
    }] )
    .run( function($rootScope, $location, Auth, $route) {

        var excludePath = ['/admin-signup', '/extras-login2', '/extras-signupform'];

        if (_.indexOf( excludePath, $location.path() ) === -1) {
            Auth.currentUser();
        }

        // On catching 401 errors, redirect to the login page.
        $rootScope.$on( 'event:auth-loginRequired', function() {
            $location.path( '/extras-login2' );
            return false;
        } );

        $rootScope.$on( '$locationChangeStart', function(event, next, current) {
            var nextRoute = $route.routes[$location.path()];

            if (_.indexOf( excludePath, $location.path() ) !== -1) {
                return;
            }
            //console.log( event );
            if (!$rootScope.currentUser) {
                $location.path( '/extras-login2' );
                return false;
            }
        } );

    } );




