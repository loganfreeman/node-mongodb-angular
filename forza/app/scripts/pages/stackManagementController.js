angular.module( 'theme.pages-controllers' ).controller( 'stackManagementController',

    ['$q', '$location', '$scope', '$global', '$rootScope', 'Auth', '$http', 'applyIcon', '$modal', '$log',
        /**
         * stack management controller
         */
        function($q, $location, $scope, $global, $rootScope, Auth, $http, applyIcon, $modal, $log) {


            $scope.itemPerPage = 3;

            $scope.pageChanged = function() {
                console.log( 'Page changed to: ' + $scope.currentPage );
                var end = $scope.currentPage * $scope.itemPerPage;
                if (end > $scope.totalItems) {
                    end = $scope.totalItems;
                }
                $scope.stacks = $scope.allstacks.slice( ($scope.currentPage - 1) * $scope.itemPerPage, end );
            };

            Auth.stacks()
                .then( function(stacks) {

                    $scope.allstacks = stacks.data;
                    $scope.totalItems = $scope.allstacks.length;

                    $scope.currentPage = 1;
                    $scope.pageChanged();


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
                        delete $scope.error;
                    } )
                    .catch( function(err) {
                        //alert( JSON.stringify( err ) );
                        $scope.error = err.data.message;
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
                            right_instances: [],
                            instances: $scope.stack.instances
                        };

                        $scope.ok = function() {
                            $scope.stack.instances = $scope.selected.instances;
                            $modalInstance.close( $scope.stack );
                        };

                        $scope.cancel = function() {
                            $modalInstance.dismiss( 'cancel' );
                        };

                        $scope.add = function() {
                            // console.log( $scope.selected.left_instances );


                            $scope.selected.instances = _.uniq( $scope.selected.instances.concat( $scope.selected.left_instances ), function(inst) {
                                return inst._id;
                            } );

                        };
                        $scope.remove = function() {
                            $scope.selected.instances = _.reject( $scope.selected.instances, function(ins) {
                                return _.some( $scope.selected.right_instances, function(exc) {
                                    return exc._id === ins._id;
                                } );
                            } );
                        };


                    },
                    resolve: {
                        instances: function() {
                            return $scope.instances;
                        }
                    }
                } );

                modalInstance.result.then( function(stack) {
                    Auth.updateStack( stack._id, {
                        instances: _.map( stack.instances, function(inst) {
                            return inst._id;
                        } )
                    } )
                        .then( function(res) {
                            console.log( res.data );
                        } );
                }, function() {
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