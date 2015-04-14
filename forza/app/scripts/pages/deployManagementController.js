angular.module( 'theme.pages-controllers' ).controller( 'deployManagementController',

    ['$q', '$location', '$scope', '$global', '$rootScope', 'Auth', '$http', 'applyIcon', function($q, $location, $scope, $global, $rootScope, Auth, $http, applyIcon) {
            // TODO: 
            Auth.deploys()
                .then( function(deploys) {

                    $scope.deploys = deploys.data;
                } );

            Auth.users()
                .then( function(users) {
                    $scope.users = users.data;
                } );


            Auth.instances()
                .then( function(instances) {
                    $scope.instances = instances.data;
                } );

            $scope.openDateDialog = function($event) {
                $event.preventDefault();
                $event.stopPropagation();

                $scope.dateDialogOpend = true;
            };

            $scope.dateOptions = {
                formatYear: 'yy',
                startingDay: 1
            };

            $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
            $scope.format = $scope.formats[0];

            $scope.today = function() {
                $scope.deploy.deployDate = new Date();
            };



            $scope.deploy = {};

            $scope.today();



            $scope.applyIconClass = applyIcon;

            $scope.addDeploy = function(form) {
                Auth.createDeploy( $scope.deploy )
                    .then( function(deploy) {
                        //alert( JSON.stringify( stack.data ) );
                        $scope.deploys.push( deploy.data );
                        delete $scope.error;
                    } )
                    .catch( function(err) {
                        //alert( JSON.stringify( err ) );
                        $scope.error = err.data.message;
                    } );
            };
    }]
);