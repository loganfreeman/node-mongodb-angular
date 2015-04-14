angular.module( 'theme.pages-controllers' ).controller( 'stackManagementController',

    ['$q', '$location', '$scope', '$global', '$rootScope', 'Auth', '$http', 'applyIcon', '$modal', '$log',
        /**
         * stack management controller
         */
        function($q, $location, $scope, $global, $rootScope, Auth, $http, applyIcon, $modal, $log) {
            // TODO: 
            Auth.stacks()
                .then( function(stacks) {

                    $scope.stacks = stacks.data;
                } );

            Auth.instances()
                .then( function(instances) {
                    $scope.instances = instances.data;
                } );

            $scope.applyIconClass = applyIcon;

            $scope.stack = {};

            $scope.addStack = function(form) {
                Auth.createStack( $scope.stack )
                    .then( function(stack) {
                        //alert( JSON.stringify( stack.data ) );
                        $scope.stacks.push( stack.data );
                    } );
            };

            $scope.modify = function(stack) {
                var modalInstance = $modal.open( {
                    templateUrl: 'stackModification.html',
                    controller: function($scope, $modalInstance, instances) {
                        $scope.stack = stack;
                        $scope.instances = instances;



                        $scope.selected = {
                            left_instances: [],
                            right_instances: []
                        };

                        $scope.ok = function() {
                            $modalInstance.close();
                        };

                        $scope.cancel = function() {
                            $modalInstance.dismiss( 'cancel' );
                        };

                        $scope.add = function() {
                            // console.log( $scope.selected.left_instances );


                            $scope.stack.instances = _.uniq( $scope.stack.instances.concat( $scope.selected.left_instances ), function(inst) {
                                return inst._id;
                            } );

                        };
                        $scope.remove = function() {
                            console.log( $scope.selected.right_instances );
                        };


                    },
                    resolve: {
                        instances: function() {
                            return $scope.instances;
                        }
                    }
                } );

                modalInstance.result.then( function() {}, function() {
                    $log.info( 'Modal dismissed at: ' + new Date() );
                } );
            };

            $scope.selectStack = function(stack, $index) {
                $scope.selectedStack = stack;
                $scope.selectedIndex = $index;
            };


        }
    ]
);