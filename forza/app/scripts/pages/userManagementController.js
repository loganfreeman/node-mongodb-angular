angular.module( 'theme.pages-controllers' ).controller( 'userManagementController',

    ['$q', '$location', '$scope', '$global', '$rootScope', 'Auth', '$http', '$modal', '$log',

        /** controller function */
        function($q, $location, $scope, $global, $rootScope, Auth, $http, $modal, $log) {
            // TODO: 
            console.log( 'In User Management Controller' );
            Auth.groups()
                .then( function(groups) {

                    $scope.groups = groups.data;
                } );

            Auth.users()
                .then( function(users) {
                    $scope.users = users.data;
                } );

            Auth.stacks()
                .then( function(stacks) {
                    $scope.stacks = stacks.data;
                } );

            Auth.instances()
                .then( function(instances) {
                    $scope.instances = instances.data;
                } );

            $scope.applyIconClass = function(obj) {
                var cls;
                switch (obj.disabled) {
                    case true:
                        cls = ' glyphicon-folder-close';
                        break;
                    default:
                        cls = ' glyphicon-folder-open';
                        break;
                }
                return cls;
            };


            $scope.signUp = function(form) {
                //console.log( $scope.user );
                Auth.createUser( $scope.user, function(err) {
                    if (!err) {
                        $location.path( '/' );
                    } else {
                        alert( err );
                    }
                } );
            };

            $scope.selectUser = function(user, $index) {
                $scope.activeUser = user;
                $scope.selectedIndex = $index;
            };


            $scope.modify = function(size) {
                if (!$scope.activeUser) {
                    alert( 'You have to select a user first' );
                    return false;
                }
                var modalInstance = $modal.open( {
                    templateUrl: 'userModification.html',
                    controller: function($scope, $modalInstance, stacks, instances) {
                        $scope.stacks = stacks;
                        $scope.instances = instances;
                        $scope.selected = {
                            stacks: [],
                            instances: []
                        };

                        $scope.ok = function() {
                            $modalInstance.close( $scope.selected );
                        };

                        $scope.cancel = function() {
                            $modalInstance.dismiss( 'cancel' );
                        };
                    },
                    size: size,
                    resolve: {
                        stacks: function() {
                            return $scope.stacks;
                        },
                        instances: function() {
                            return $scope.instances;
                        }
                    }
                } );

                modalInstance.result.then( function(selectedItem) {
                    //$scope.selected = selectedItem;
                    //$scope.activeUser.stacks.push( selectedItem.stack );
                    // $scope.activeUser.instances.push( selectedItem.instance );
                    Auth.updateUser( $scope.activeUser._id,
                        {
                            stacks: selectedItem.stacks,
                            instances: selectedItem.instances
                        } )
                        .then( function(res) {
                            //alert( res.data );
                            //$location.path( '/users' );
                            $scope.activeUser = res.data;
                            $scope.users[$scope.selectedIndex] = $scope.activeUser;
                        } );

                }, function() {
                        $log.info( 'Modal dismissed at: ' + new Date() );
                    } );
            };


    }]
);