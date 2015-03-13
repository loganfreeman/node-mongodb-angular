/**
 * Created by scheng on 3/12/15.
 */
'use strict'
angular.module('devops', [])
    .controller('DevopsController', function ($scope) {
        $scope.environments = [{
            name: 'Production'
        }, {
            name: 'Test'
        }, {
            name: 'Development'
        }, {
            name: 'Stage',
            active: true
        }];

        $scope.environmentOnClick = function ($index) {
            console.log($scope.environment[$index].name);
        }
    });