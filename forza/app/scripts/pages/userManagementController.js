angular.module( 'theme.pages-controllers' ).controller( 'userManagementController',

    ['$q', '$location', '$scope', '$global', '$rootScope', 'Auth', '$http', '$modal', '$log',

        /** controller function */
        function($q, $location, $scope, $global, $rootScope, Auth, $http, $modal, $log) {
            // TODO: 
            //console.log( 'In User Management Controller' );
            $scope.group = {};

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
                Auth.createUser( $scope.user )
                    .then( function(user) {
                        delete $scope.error;
                        delete $scope.errors;
                    } )
                    .catch( function(err) {
                        $scope.error = err.data.message;
                        $scope.errors = err.data.errors;
                        angular.forEach( $scope.errors, function(error, field) {
                            form[field].$setValidity( 'mongoose', false );
                        } );
                    } );
            };

            $scope.selectUser = function(user, $index) {
                $scope.activeUser = user;
                $scope.selectedIndex = $index;
            };


            $scope.addGroup = function(form) {
                Auth.createGroup( $scope.group )
                    .then( function(group) {
                        //alert( JSON.stringify( stack.data ) );
                        $scope.groups.push( group.data );
                        delete $scope.error;
                    } )
                    .catch( function(err) {
                        //alert( JSON.stringify( err ) );
                        $scope.error = err.data.message;
                    } );
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