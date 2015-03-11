angular.module('flot-directive', []).directive('flotChartMoving', function() {
    return {
        restrict: 'EA',
        scope: {
            chartData: '=chartData',
            chartOptions: '=chartOptions'
        },
        link: function(scope, element, attrs) {

            var maximum = $('#' + element[0].id).outerWidth() / 2 || 300;


            var series = [{
                data: scope.chartData(maximum),
                lines: {
                    fill: true
                }
            }];
            var plot = $.plot($('#' + element[0].id), series, scope.chartOptions);
            // Update the random dataset at 25FPS for a smoothly-animating chart

            setInterval(function updateRandom() {
                series[0].data = scope.chartData(maximum);
                plot.setData(series);
                plot.draw();
            }, 40);
        }
    }
})
    .directive('flotBarChart', function() {
        return {
            restrict: 'EA',
            scope: {
                barData: '=barData',
                barOptions: '=barOptions'
            },
            link: function(scope, element, attrs) {
                $.plot($('#' + element[0].id), scope.barData, scope.barOptions);
            }
        }
    })
    .directive('flotLineChart', function() {
        return {
            restrict: 'EA',
            scope: {
                lineData: '=lineData',
                lineOptions: '=lineOptions'
            },
            link: function(scope, element, attrs) {
                $.plot($('#' + element[0].id), scope.lineData, scope.lineOptions);
            }
        }
    })
    .directive('flotPieChart', function() {
        return {
            restrict: 'EA',
            scope: {
                pieData: '=pieData',
                pieOptions: '=pieOptions'
            },
            link: function(scope, element, attrs) {
                $.plot($('#' + element[0].id), scope.pieData, scope.pieOptions);
            }
        }
    })
    .directive('flotLineChartMulti', function() {
        return {
            restrict: 'EA',
            scope: {
                chartData: '=chartData',
                chartOptions: '=chartOptions'
            },
            link: function(scope, element, attrs) {
                $.plot($('#' + element[0].id), scope.chartData, scope.chartOptions);
            }
        }
    });