angular.module( 'theme.pages-controllers' ).controller( 'instanceManagementController',

    ['$q', '$location', '$scope', '$global', '$rootScope', 'Auth', '$http', 'applyIcon', function($q, $location, $scope, $global, $rootScope, Auth, $http, applyIcon) {
            // TODO: 

            $scope.itemPerPage = 3;

            $scope.pageChanged = function() {
                console.log( 'Page changed to: ' + $scope.currentPage );
                var end = $scope.currentPage * $scope.itemPerPage;
                if (end > $scope.totalItems) {
                    end = $scope.totalItems;
                }
                $scope.instances = $scope.allinstances.slice( ($scope.currentPage - 1) * $scope.itemPerPage, end );
            };

            Auth.instances()
                .then( function(instances) {

                    $scope.allinstances = instances.data;
                    $scope.totalItems = $scope.allinstances.length;

                    $scope.currentPage = 1;
                    $scope.pageChanged();
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
                        delete $scope.error;
                    } )
                    .catch( function(err) {
                        //alert( JSON.stringify( err ) );
                        $scope.error = err.data.message;
                    } );
            };

            $scope.checkStandalone = function(instance) {
                if (!instance.stack) {
                    return 'glyphicon-exclamation-sign';
                }
            };
        }
    ]
);
