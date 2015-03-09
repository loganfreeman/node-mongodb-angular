angular.module( 'dashboard.pages' )
    .config( function($stateProvider) {
        $stateProvider
            .state( 'app.home', {
                url: '/',
                templateUrl: 'home/home.tpl.html',
                controller: 'homeController'
            } );

    } )
    .controller( 'homeController', function($scope) {
        //TODO: create charts here that are on home screen
        $scope.exampleData = {
            'title': 'Revenue',
            'subtitle': 'US$, in thousands',
            'ranges': [150, 225, 300],
            'measures': [220],
            'markers': [250]
        };
        //           $scope.exampleData =  {"title":"Revenue","subtitle":"US$, in thousands","ranges":[50,200,275],"measures":[220],"markers":[250]};
        //            $scope.exampleData =  {"title":"Revenue","subtitle":"US$, in thousands","measures":[220],"markers":[250]};
        $scope.rangesFunction = function() {
            console.log( 'rangesFunction called' );
            return function(d) {
                return [50, 100, 200];
            };
        };


        // chart data
        $scope.chart = {
            labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            datasets: [
                {
                    fillColor: 'rgba(151,187,205,0)',
                    strokeColor: '#e67e22',
                    pointColor: 'rgba(151,187,205,0)',
                    pointStrokeColor: '#e67e22',
                    data: [4, 3, 5, 4, 6]
                },
                {
                    fillColor: 'rgba(151,187,205,0)',
                    strokeColor: '#f1c40f',
                    pointColor: 'rgba(151,187,205,0)',
                    pointStrokeColor: '#f1c40f',
                    data: [8, 3, 2, 5, 4]
                }
            ],
        };
    } );