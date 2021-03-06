angular.module( 'theme.pages-controllers' ).controller( 'userManagementController',

    ['$q', '$location', '$scope', '$global', '$rootScope', 'Auth', '$http', '$modal', '$log', 'Util',

        /** controller function */
        function($q, $location, $scope, $global, $rootScope, Auth, $http, $modal, $log, Util) {
            // TODO: 
            //console.log( 'In User Management Controller' );
            $scope.group = {};

            $scope.onDeleteBtnClick = function() {
                if (!$scope.activeUser) {
                    alert( 'No user selected' );
                    return;
                }
                Auth.deleteUser( $scope.activeUser._id )
                    .then( function(result) {
                        Util.removeItem( $scope.users, $scope.activeUser );
                    } );
            };

            $scope.deleteGroup = function(group) {
                Auth.deleteGroup( group._id )
                    .then( function(result) {
                        Util.removeItem( $scope.groups, group );
                    } );
            };

            $scope.loadUsers = function() {
                Auth.users()
                    .then( function(users) {
                        $scope.users = users.data;
                    } );
            };

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
                        $scope.loadUsers();
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

            $scope.checkActive = function(user) {
                if ($scope.activeUser == user) {
                    return 'active';
                }
                return '';
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
                    controller: function($scope, $modalInstance, stacks, instances, groups) {
                        $scope.stacks = stacks;
                        $scope.instances = instances;
                        $scope.groups = groups;
                        $scope.selected = {
                            stacks: [],
                            instances: [],
                            groups: []
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
                        },
                        groups: function() {
                            return $scope.groups;
                        }
                    }
                } );

                modalInstance.result.then( function(selectedItem) {
                    //$scope.selected = selectedItem;
                    //$scope.activeUser.stacks.push( selectedItem.stack );
                    // $scope.activeUser.instances.push( selectedItem.instance );
                    Auth
                        .updateUser( $scope.activeUser._id, {
                            groups: selectedItem.groups,
                            firstname: selectedItem.firstname,
                            lastname: selectedItem.lastname,
                            email: selectedItem.email,
                            username: selectedItem.username,
                            password: selectedItem.password,
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


        }
    ]
);