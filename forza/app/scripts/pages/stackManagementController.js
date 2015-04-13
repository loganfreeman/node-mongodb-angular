angular.module( 'theme.pages-controllers' ).controller( 'stackManagementController',

    ['$q', '$location', '$scope', '$global', '$rootScope', 'Auth', '$http', 'applyIcon', function($q, $location, $scope, $global, $rootScope, Auth, $http, applyIcon) {
            // TODO: 
            Auth.stacks()
                .then( function(stacks) {

                    $scope.stacks = stacks.data;
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
        }
    ]
);