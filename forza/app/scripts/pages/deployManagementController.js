angular.module( 'theme.pages-controllers' ).controller( 'deployManagementController',

    ['$q', '$location', '$scope', '$global', '$rootScope', 'Auth', '$http', 'applyIcon', function($q, $location, $scope, $global, $rootScope, Auth, $http, applyIcon) {
            $scope.itemPerPage = 3;

            $scope.pageChanged = function() {
                console.log( 'Page changed to: ' + $scope.currentPage );
                var end = $scope.currentPage * $scope.itemPerPage;
                if (end > $scope.totalItems) {
                    end = $scope.totalItems;
                }
                $scope.deploys = $scope.alldeploys.slice( ($scope.currentPage - 1) * $scope.itemPerPage, end );
            };

            Auth.deploys()
                .then( function(deploys) {

                    $scope.alldeploys = deploys.data;
                    $scope.totalItems = $scope.alldeploys.length;

                    $scope.currentPage = 1;
                    $scope.pageChanged();
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