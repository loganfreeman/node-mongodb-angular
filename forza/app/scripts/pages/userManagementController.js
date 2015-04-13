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

            $scope.selectUser = function(user) {
                $scope.activeUser = user;
            };

            $scope.items = ['item1', 'item2', 'item3'];

            $scope.modify = function(size) {
                var modalInstance = $modal.open( {
                    templateUrl: 'myModalContent.html',
                    controller: function($scope, $modalInstance, items) {
                        $scope.items = items;
                        $scope.selected = {
                            item: $scope.items[0]
                        };

                        $scope.ok = function() {
                            $modalInstance.close( $scope.selected.item );
                        };

                        $scope.cancel = function() {
                            $modalInstance.dismiss( 'cancel' );
                        };
                    },
                    size: size,
                    resolve: {
                        items: function() {
                            return $scope.items;
                        }
                    }
                } );

                modalInstance.result.then( function(selectedItem) {
                    $scope.selected = selectedItem;
                }, function() {
                        $log.info( 'Modal dismissed at: ' + new Date() );
                    } );
            };


    }]
);