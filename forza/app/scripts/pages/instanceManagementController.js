angular.module( 'theme.pages-controllers' )
    .controller( 'instanceManagementController',

        ['$q', '$location', '$scope', '$global', '$rootScope', 'Auth', '$http', 'applyIcon', 'Constants', '$modal', '$log',

            /**
             *
             * 
             * 
             * 
             */
            function($q, $location, $scope, $global, $rootScope, Auth, $http, applyIcon, Constants, $modal, $log) {

                $scope.itemPerPage = 3;

                $scope.serviceTypes = Constants.ServiceType;




                $scope.modify = function(instance) {
                    $scope.currentInstance = instance;

                    var modalInstance = $modal.open( {
                        templateUrl: 'instanceModification.html',
                        controller: function($scope, $modalInstance, stacks, serviceTypes) {
                            $scope.stacks = stacks;
                            $scope.serviceTypes = serviceTypes;
                            $scope.selected = {
                                stacks: []
                            };

                            $scope.ok = function() {
                                $modalInstance.close( $scope.selected );
                            };

                            $scope.cancel = function() {
                                $modalInstance.dismiss( 'cancel' );
                            };
                        },
                        resolve: {
                            stacks: function() {
                                return $scope.stacks;
                            },
                            serviceTypes: function() {
                                return $scope.serviceTypes;
                            }
                        }
                    } );

                    modalInstance.result.then( function(selectedItem) {
                        //$scope.selected = selectedItem;
                        //$scope.activeUser.stacks.push( selectedItem.stack );
                        // $scope.activeUser.instances.push( selectedItem.instance );
                        console.log( selectedItem );

                    }, function() {
                            $log.info( 'Modal dismissed at: ' + new Date() );
                        } );
                };



                $scope.pageChanged = function() {
                    console.log( 'Page changed to: ' + $scope.currentPage );
                    var end = $scope.currentPage * $scope.itemPerPage;
                    if (end > $scope.totalItems) {
                        end = $scope.totalItems;
                    }
                    $scope.instances = $scope.filteredallinstances.slice( ($scope.currentPage - 1) * $scope.itemPerPage, end );
                };

                $scope.instancesLoaded = function(instances) {
                    $scope.filteredallinstances = instances;
                    $scope.totalItems = $scope.filteredallinstances.length;
                    $scope.currentPage = 1;
                };

                Auth.instances()
                    .then( function(instances) {

                        $scope.allinstances = instances.data;

                        $scope.instancesLoaded( $scope.allinstances );


                        $scope.pageChanged();
                    } );


                Auth.stacks()
                    .then( function(stacks) {
                        $scope.stacks = stacks.data;
                    } );

                $scope.applyIconClass = applyIcon;

                $scope.instance = {
                    stacks: []
                };

                $scope.changeStack = function(stack) {
                    var instances = $scope.allinstances;
                    if (stack) {
                        instances = _.filter( $scope.allinstances, function(instance) {
                            return instance.stacks.indexOf( stack ) >= 0;
                        } );
                    }

                    $scope.instancesLoaded( instances );
                    $scope.pageChanged();
                };




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
                    if (!instance.stacks) {
                        return 'glyphicon-exclamation-sign';
                    }
                };
            }
            ]
);
