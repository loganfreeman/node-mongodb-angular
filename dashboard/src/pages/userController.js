angular.module( 'dashboard.user', ['ui.bootstrap', 'ngAside'] )
    .controller( 'userController', function($scope, $aside) {
        $scope.openAside = function(position) {
            $aside.open( {
                templateUrl: 'pages/userAside.tpl.html',
                placement: position,
                size: 'sm',
                backdrop: false,
                controller: function($scope, $modalInstance) {
                    $scope.ok = function(e) {
                        $modalInstance.close();
                        e.stopPropagation();
                    };
                    $scope.cancel = function(e) {
                        $modalInstance.dismiss();
                        e.stopPropagation();
                    };
                }
            } );
        };
    } );