angular.module( 'theme.pages-controllers' ).controller( 'instanceManagementController',

    ['$q', '$location', '$scope', '$global', '$rootScope', 'Auth', '$http', 'applyIcon', function($q, $location, $scope, $global, $rootScope, Auth, $http, applyIcon) {
            // TODO: 
            Auth.instances()
                .then( function(instances) {

                    $scope.instances = instances.data;
                } );


            Auth.stacks()
                .then( function(stacks) {
                    $scope.stacks = stacks.data;
                } );

            $scope.applyIconClass = applyIcon;

            $scope.instance = {};

            $scope.addInstance = function(form) {
                Auth.createInstance( $scope.instance )
                    .then( function(instance) {
                        // alert( JSON.stringify( instance.data ) );
                        $scope.instances.push( instance.data );
                    } );
            };

            $scope.checkStandalone = function(instance) {
                if (!instance.stack) {
                    return 'standalone';
                }
            };
        }
    ]
);