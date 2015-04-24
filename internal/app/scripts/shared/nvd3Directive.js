'user strict';

angular.module( 'themes.nvd3-directive', ['themes.nvd3'] )
    .directive( 'nvd3PieChart', ['configurationUtils', function(configurationUtils) {
            return {
                restrict: 'EA',
                scope: {
                    data: '=',
                    width: '@',
                    height: '@',
                    id: '@',
                    showlabels: '@',
                    showlegend: '@',
                    donutLabelsOutside: '@',
                    pieLabelsOutside: '@',
                    labelType: '@',
                    nodata: '@',
                    margin: '&',
                    x: '&',
                    y: '&',
                    color: '&',
                    donut: '@',
                    donutRatio: '@',
                    labelthreshold: '@',
                    description: '&',
                    tooltips: '@',
                    tooltipcontent: '&',
                    valueFormat: '&',

                    callback: '&',

                    legendmargin: '&',
                    legendwidth: '@',
                    legendheight: '@',
                    legendkey: '@',
                    legendcolor: '&',
                    legendalign: '@',
                    legendrightalign: '@',
                    legendupdatestate: '@',
                    legendradiobuttonmode: '@',

                    //angularjs specific
                    objectequality: '@',

                    //d3.js specific
                    transitionduration: '@'

                },
                controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs) {
                        $scope.d3Call = function(data, chart) {
                            configurationUtils.checkElementID( $scope, $attrs, $element, chart, data );
                        };
                }],
                link: function(scope, element, attrs) {
                    scope.$watch( 'data', function(data) {
                        if (data) {
                            //if the chart exists on the scope, do not call addGraph again, update data and call the chart.
                            if (scope.chart) {
                                return scope.d3Call( data, scope.chart );
                            }
                            nv.addGraph( {
                                generate: function() {
                                    configurationUtils.initializeMargin( scope, attrs );
                                    var chart = nv.models.pieChart()
                                        .x( attrs.x === undefined ? function(d) {
                                            return d[0];
                                        } : scope.x() )
                                        .y( attrs.y === undefined ? function(d) {
                                            return d[1];
                                        } : scope.y() )
                                        .width( scope.width )
                                        .height( scope.height )
                                        .margin( scope.margin )
                                        .tooltips( attrs.tooltips === undefined ? false : (attrs.tooltips === 'true') )
                                        .noData( attrs.nodata === undefined ? 'No Data Available.' : scope.nodata )
                                        .showLabels( attrs.showlabels === undefined ? false : (attrs.showlabels === 'true') )
                                        .labelThreshold( attrs.labelthreshold === undefined ? 0.02 : attrs.labelthreshold )
                                        .labelType( attrs.labeltype === undefined ? 'key' : attrs.labeltype )
                                        .pieLabelsOutside( attrs.pielabelsoutside === undefined ? true : (attrs.pielabelsoutside === 'true') )
                                        .valueFormat( attrs.valueformat === undefined ? d3.format( ',.2f' ) : attrs.valueformat )
                                        .showLegend( attrs.showlegend === undefined ? false : (attrs.showlegend === 'true') )
                                        .color( attrs.color === undefined ? nv.utils.defaultColor() : scope.color() )
                                        .donutLabelsOutside( attrs.donutlabelsoutside === undefined ? false : (attrs.donutlabelsoutside === 'true') )
                                        .donut( attrs.donut === undefined ? false : (attrs.donut === 'true') )
                                        .donutRatio( attrs.donutratio === undefined ? 0.5 : (attrs.donutratio) );

                                    if (attrs.tooltipcontent) {
                                        chart.tooltipContent( scope.tooltipcontent() );
                                    }

                                    scope.d3Call( data, chart );
                                    nv.utils.windowResize( chart.update );
                                    scope.chart = chart;
                                    return chart;
                                },
                                callback: attrs.callback === undefined ? null : scope.callback()
                            } );
                        }
                    }, (attrs.objectequality === undefined ? false : (attrs.objectequality === 'true') ));
                }
            };
    }] );