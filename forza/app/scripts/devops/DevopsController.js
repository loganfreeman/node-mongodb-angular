/**
 * Created by scheng on 3/12/15.
 */
'use strict'
angular.module('devops', [])
    .factory('utils', function () {
        // -> Fisher–Yates shuffle algorithm
        var shuffleArray = function (array) {

            array = array.slice();

            var m = array.length,
                t, i;

            // While there remain elements to shuffle
            while (m) {
                // Pick a remaining element…
                i = Math.floor(Math.random() * m--);

                // And swap it with the current element.
                t = array[m];
                array[m] = array[i];
                array[i] = t;
            }

            return array;
        };
        return {
            shuffleArray: shuffleArray
        };
    })
    .controller('DevopsController', function ($scope, utils) {


        var stacks = [{
            name: 'Stack 1',
            description: chance.paragraph()

        }, {
            name: 'Stack 2',
            description: chance.paragraph(),
            disabled: true
        }, {
            name: 'Stack 3',
            description: chance.paragraph(),
            active: true
        }];
        $scope.environments = [{
            name: 'Production',
            stacks: utils.shuffleArray(stacks)
        }, {
            name: 'Test',
            stacks: utils.shuffleArray(stacks)
        }, {
            name: 'Development',
            stacks: utils.shuffleArray(stacks)
        }, {
            name: 'Stage',
            stacks: utils.shuffleArray(stacks)
        }];

        $scope.environmentOnClick = function ($index) {
            console.log($scope.environment[$index].name);
        };

        $scope.applyIconClass = function (obj) {
            var cls;
            switch (obj.disabled) {
                case true:
                    cls = ' glyphicon-folder-close';
                    break;
                default :
                    cls = ' glyphicon-folder-open';
                    break;
            }
            return cls;
        };

    });