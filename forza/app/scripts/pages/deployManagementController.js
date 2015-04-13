angular.module( 'theme.pages-controllers' ).controller( 'deployManagementController',

    ['$q', '$location', '$scope', '$global', '$rootScope', 'Auth', '$http', 'applyIcon', function($q, $location, $scope, $global, $rootScope, Auth, $http, applyIcon) {
            // TODO: 
            Auth.deploys()
                .then( function(deploys) {

                    $scope.deploys = deploys.data;
                } );

            Auth.users()
                .then( function(users) {
                    $scope.users = users.data;
                } );


            Auth.instances()
                .then( function(instances) {
                    $scope.instances = instances.data;
                } );


            $scope.deploy = {};



            $scope.applyIconClass = applyIcon;

            $scope.addDeploy = function(form) {
                Auth.createDeploy( $scope.deploy )
                    .then( function(deploy) {
                        //alert( JSON.stringify( stack.data ) );
                        $scope.deploys.push( deploy.data );
                    } );
            };
        }
    ]
);