angular.module( 'dashboard.pages', ['dashboard.page', 'dashboard.user',
    /** login service to intercept route change and do authorization */
    'loginService',
    /** angular nvd3 directives */
    'nvd3ChartDirectives',
    /** chartjs anglar directives */
'angles'] )
    .config( function($stateProvider) {
        $stateProvider
            .state( 'app.admin', {
                url: '/admin',
                templateUrl: 'pages/admin.tpl.html',
                controller: 'adminController',
                accessLevel: accessLevels.admin
            } )
            .state( 'app.user', {
                url: '/user',
                templateUrl: 'pages/user.tpl.html',
                controller: 'userController'
            } )
            .state( 'app.devops', {
                url: '/devops',
                templateUrl: 'devops/home.tpl.html',
                controller: 'devopsController'
            } )
            .state( 'app.error', {
                url: '/error/:error',
                templateUrl: 'error/error.tpl.html',
                accessLevel: accessLevels.public
            } )
            .state( 'app.register', {
                url: '/register',
                templateUrl: 'register/register.tpl.html',
                controller: 'registerController'
            } );

    } )
    .factory( 'utils', function() {
        return {
            // -> Fisher–Yates shuffle algorithm
            shuffleArray: function(array) {

                array = array.slice();

                var m = array.length,
                    t, i;

                // While there remain elements to shuffle
                while (m) {
                    // Pick a remaining element…
                    i = Math.floor( Math.random() * m-- );

                    // And swap it with the current element.
                    t = array[m];
                    array[m] = array[i];
                    array[i] = t;
                }

                return array;
            }
        };
    } )
    .controller( 'adminController', function($scope) {
        $( '[data-toggle="offcanvas"]' ).click( function() {
            $( '.row-offcanvas' ).toggleClass( 'active' );
        } );
    } )
    .controller( 'registerController', function(loginService, $scope) {
        //TODO: add register logic 
        $scope.roles = ['Admin', 'User', 'Public'];
    } )
    .controller( 'devopsController', function($scope, utils) {
        // The environment refers to the development state of the code & service. For example Production, Development, etc.
        $scope.environments = [{
            description: 'Production'
            }, {
            description: 'Stage'
            }, {
            description: 'Development'
        }];

        // use some test data
        var stacks = [{
            descriptiion: 'stack 1'
            }, {
            description: 'stack 2'
            }, {
            description: 'stack 3'
            }, {
            description: 'stack 4'
            }, {
            description: 'stack 5'
            }, {
            description: 'stack 6'
            }, {
            description: 'stack 7'
            }, {
            description: 'stack 8'
        }];

        var instances = [{
            descriptiion: 'instance 1'
            }, {
            description: 'isntance 2'
            }, {
            description: 'instance 3'
            }, {
            description: 'instance 4'
            }, {
            description: 'instance 5'
            }, {
            description: 'instance 6'
            }, {
            description: 'instance 7'
            }, {
            description: 'instance 8'
        }];

        var deploys = [{
            descriptiion: 'deploy 1'
            }, {
            description: 'deploy 2'
            }, {
            description: 'deploy 3'
            }, {
            description: 'deploy 4'
            }, {
            description: 'deploy 5'
            }, {
            description: 'deploy 6'
            }, {
            description: 'deploy 7'
            }, {
            description: 'deploy 8'
        }];
        // A stack is a group of instances working together with a specific purpose. A stack belongs to one Environment. 
        $scope.stacks = [];
        // An instance is composed of: name, ip and description
        $scope.instances = [];

        // An instance can have muliple deployed branches.
        $scope.deploys = [];

        $scope.instanceOnClick = function($index) {
            $scope.instanceIndex = $index;
            $scope.deploys = utils.shuffleArray( deploys );
        };

        $scope.environmentOnClick = function($index) {
            $scope.environmentIndex = $index;
            $scope.stacks = utils.shuffleArray( stacks );
        };

        $scope.stackOnClick = function($index) {
            $scope.stackIndex = $index;
            $scope.instances = utils.shuffleArray( instances );

        };
        $scope.deployOnClick = function($index) {
            $scope.deployIndex = $index;

        };
    } );