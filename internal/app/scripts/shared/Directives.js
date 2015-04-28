'use strict';

angular
    .module( 'theme.directives', [] )
    .constant( 'REGEXP', {
        INTEGER_REGEXP: /^\-?\d+$/
    } )
    .controller( 'TimeCtrl', function TimeCtrl($scope, $timeout) {
        $scope.clock = 'loading clock...'; // initialise the time variable
        $scope.tickInterval = 1000; //ms

        var tick = function() {
            $scope.clock = Date.now(); // get the current time
            $timeout( tick, $scope.tickInterval ); // reset the timer
        };

        // Start the timer
        $timeout( tick, $scope.tickInterval );
    } )
    .directive( 'disableAnimation', ['$animate', function($animate) {
            return {
                restrict: 'A',
                link: function($scope, $element, $attrs) {
                    $attrs.$observe( 'disableAnimation', function(value) {
                        $animate.enabled( !value, $element );
                    } );
                }
            };
    }] )
    .directive( 'slideOut', function() {
        return {
            restrict: 'A',
            scope: {
                show: '=slideOut'
            },
            link: function(scope, element, attr) {
                element.hide();
                scope.$watch( 'show', function(newVal, oldVal) {
                    if (newVal !== oldVal) {
                        element.slideToggle( {
                            complete: function() {
                                scope.$apply();
                            }
                        } );
                    }
                } );
            }
        };
    } )
    .directive( 'slideOutNav', ['$timeout', function($t) {
            return {
                restrict: 'A',
                scope: {
                    show: '=slideOutNav'
                },
                link: function(scope, element, attr) {
                    scope.$watch( 'show', function(newVal, oldVal) {
                        if ($( 'body' ).hasClass( 'collapse-leftbar' )) {
                            if (newVal == true) {
                                element.css( 'display', 'block' );
                            } else {
                                element.css( 'display', 'none' );
                            }
                            return;
                        }
                        if (newVal == true) {
                            element.slideDown( {
                                complete: function() {
                                    $t( function() {
                                        scope.$apply();
                                    } );
                                }
                            } );
                        } else if (newVal == false) {
                            element.slideUp( {
                                complete: function() {
                                    $t( function() {
                                        scope.$apply();
                                    } );
                                }
                            } );
                        }
                    } );
                }
            };
    }] )
    .directive( 'panel', function() {
        return {
            restrict: 'E',
            transclude: true,
            scope: {
                panelClass: '@',
                heading: '@',
                panelIcon: '@'
            },
            templateUrl: 'templates/panel.html',
        };
    } )
    .directive( 'pulsate', function() {
        return {
            scope: {
                pulsate: '='
            },
            link: function(scope, element, attr) {
                $( element ).pulsate( scope.pulsate );
            }
        };
    } )
    .directive( 'prettyprint', function() {
        return {
            restrict: 'C',
            link: function postLink(scope, element, attrs) {
                element.html( prettyPrintOne( element.html(), '', true ) );
            }
        };
    } )
    .directive( 'passwordVerify', function() {
        return {
            require: 'ngModel',
            scope: {
                passwordVerify: '='
            },
            link: function(scope, element, attrs, ctrl) {
                scope.$watch( function() {
                    var combined;

                    if (scope.passwordVerify || ctrl.$viewValue) {
                        combined = scope.passwordVerify + '_' + ctrl.$viewValue;
                    }
                    return combined;
                }, function(value) {
                        if (value) {
                            ctrl.$parsers.unshift( function(viewValue) {
                                var origin = scope.passwordVerify;
                                if (origin !== viewValue) {
                                    ctrl.$setValidity( 'passwordVerify', false );
                                    return undefined;
                                } else {
                                    ctrl.$setValidity( 'passwordVerify', true );
                                    return viewValue;
                                }
                            } );
                        }
                    } );
            }
        };
    } )
    .directive( 'backgroundSwitcher', function() {
        return {
            restrict: 'EA',
            link: function(scope, element, attr) {
                $( element ).click( function() {
                    $( 'body' ).css( 'background', $( element ).css( 'background' ) );
                } );
            }
        };
    } )
    .directive( 'panelControls', [function() {
            return {
                restrict: 'E',
                require: '?^tabset',
                link: function(scope, element, attrs, tabsetCtrl) {
                    var panel = $( element ).closest( '.panel' );
                    if (panel.hasClass( '.ng-isolate-scope' ) == false) {
                        $( element ).appendTo( panel.find( '.options' ) );
                    }
                }
            };
    }] )
    .directive( 'panelControlCollapse', function() {
        return {
            restrict: 'EAC',
            link: function(scope, element, attr) {
                element.bind( 'click', function() {
                    $( element ).toggleClass( 'fa-chevron-down fa-chevron-up' );
                    $( element ).closest( '.panel' ).find( '.panel-body' ).slideToggle( {
                        duration: 200
                    } );
                    $( element ).closest( '.panel-heading' ).toggleClass( 'rounded-bottom' );
                } );
                return false;
            }
        };
    } )
    .directive( 'icheck', function($timeout, $parse) {
        return {
            require: '?ngModel',
            link: function($scope, element, $attrs, ngModel) {
                return $timeout( function() {
                    var parentLabel = element.parent( 'label' );
                    if (parentLabel.length) {
                        parentLabel.addClass( 'icheck-label' );
                    }
                    var value;
                    value = $attrs['value'];

                    $scope.$watch( $attrs['ngModel'], function(newValue) {
                        $( element ).iCheck( 'update' );
                    } );

                    return $( element ).iCheck( {
                        checkboxClass: 'icheckbox_minimal-blue',
                        radioClass: 'iradio_minimal-blue'

                    } ).on( 'ifChanged', function(event) {
                        if ($( element ).attr( 'type' ) === 'checkbox' && $attrs['ngModel']) {
                            $scope.$apply( function() {
                                return ngModel.$setViewValue( event.target.checked );
                            } );
                        }
                        if ($( element ).attr( 'type' ) === 'radio' && $attrs['ngModel']) {
                            return $scope.$apply( function() {
                                return ngModel.$setViewValue( value );
                            } );
                        }
                    } );
                } );
            }
        };
    } )
    .directive( 'knob', function() {
        return {
            restrict: 'EA',
            template: '<input class="dial" type="text"/>',
            scope: {
                options: '='
            },
            replace: true,
            link: function(scope, element, attr) {
                $( element ).knob( scope.options );
            }
        };
    } )
    .directive( 'uiBsSlider', ['$timeout', function($timeout) {
            return {
                link: function(scope, element, attr) {
                    // $timeout is needed because certain wrapper directives don't
                    // allow for a correct calculaiton of width
                    $timeout( function() {
                        element.slider();
                    } );
                }
            };
    }] )
    .directive( 'tileLarge', function() {
        return {
            restrict: 'E',
            scope: {
                item: '=data'
            },
            templateUrl: 'templates/tile-large.html',
            replace: true,
            transclude: true
        };
    } )
    .directive( 'tileMini', function() {
        return {
            restrict: 'E',
            scope: {
                item: '=data'
            },
            replace: true,
            templateUrl: 'templates/tile-mini.html'
        };
    } )
    .directive( 'tile', function() {
        return {
            restrict: 'E',
            scope: {
                heading: '@',
                type: '@'
            },
            transclude: true,
            templateUrl: 'templates/tile-generic.html',
            link: function(scope, element, attr) {
                var heading = element.find( 'tile-heading' );
                if (heading.length) {
                    heading.appendTo( element.find( '.tiles-heading' ) );
                }
            },
            replace: true
        };
    } )
    .directive( 'jscrollpane', ['$timeout', function($timeout) {
            return {
                restrict: 'A',
                scope: {
                    options: '=jscrollpane'
                },
                link: function(scope, element, attr) {
                    $timeout( function() {
                        if (navigator.appVersion.indexOf( 'Win' ) != -1) {
                            element.jScrollPane( $.extend( {
                                mouseWheelSpeed: 20
                            }, scope.options ) );
                        } else {
                            element.jScrollPane( scope.options );
                        }
                        element.on( 'click', '.jspVerticalBar', function(event) {
                            event.preventDefault(); event.stopPropagation();
                        } );
                        element.bind( 'mousewheel', function(e) {
                            e.preventDefault();
                        } );
                    } );
                }
            };
    }] )
    // specific to app
    .directive( 'stickyScroll', function() {
        return {
            restrict: 'A',
            link: function(scope, element, attr) {
                function stickyTop() {
                    var topMax = parseInt( attr.stickyScroll );
                    var headerHeight = $( 'header' ).height();
                    if (headerHeight > topMax) {
                        topMax = headerHeight;
                    }
                    if ($( 'body' ).hasClass( 'static-header' ) == false)
                        return element.css( 'top', topMax + 'px' );
                    var window_top = $( window ).scrollTop();
                    var div_top = element.offset().top;
                    if (window_top < topMax) {
                        element.css( 'top', (topMax - window_top) + 'px' );
                    } else {
                        element.css( 'top', 0 + 'px' );
                    }
                }

                $( function() {
                    $( window ).scroll( stickyTop );
                    stickyTop();
                } );
            }
        };
    } )
    .directive( 'rightbarRightPosition', function() {
        return {
            restrict: 'A',
            scope: {
                isFixedLayout: '=rightbarRightPosition'
            },
            link: function(scope, element, attr) {
                scope.$watch( 'isFixedLayout', function(newVal, oldVal) {
                    if (newVal != oldVal) {
                        setTimeout( function() {
                            var $pc = $( '#page-content' );
                            var ending_right = ($( window ).width() - ($pc.offset().left + $pc.outerWidth()));
                            if (ending_right < 0) {
                                ending_right = 0;
                            }
                            $( '#page-rightbar' ).css( 'right', ending_right );
                        }, 100 );
                    }
                } );
            }
        };
    } )
    .directive( 'fitHeight', ['$window', '$timeout', '$location', function($window, $timeout, $location) {
            return {
                restrict: 'A',
                scope: true,
                link: function(scope, element, attr) {
                    scope.docHeight = $( document ).height();
                    var setHeight = function(newVal) {
                        var diff = $( 'header' ).height();
                        if ($( 'body' ).hasClass( 'layout-horizontal' )) {
                            diff += 112;
                        }
                        if ((newVal - diff) > element.outerHeight()) {
                            element.css( 'min-height', (newVal - diff) + 'px' );
                        } else {
                            element.css( 'min-height', $( window ).height() - diff );
                        }
                    };
                    scope.$watch( 'docHeight', function(newVal, oldVal) {
                        setHeight( newVal );
                    } );
                    $( window ).on( 'resize', function() {
                        setHeight( $( document ).height() );
                    } );
                    var resetHeight = function() {
                        scope.docHeight = $( document ).height();
                        $timeout( resetHeight, 1000 );
                    };
                    $timeout( resetHeight, 1000 );
                }
            };
    }] )
    .directive( 'jscrollpaneOn', ['$timeout', function($timeout) {
            return {
                restrict: 'A',
                scope: {
                    applyon: '=jscrollpaneOn'
                },
                link: function(scope, element, attr) {
                    scope.$watch( 'applyon', function(newVal) {
                        if (newVal == false) {
                            var api = element.data( 'jsp' );
                            if (api) {
                                api.destroy();
                            }
                            return;
                        }
                        $timeout( function() {
                            element.jScrollPane( {
                                autoReinitialise: true
                            } );
                        } );
                    } );
                }
            };
    }] )
    .directive( 'backToTop', function() {
        return {
            restrict: 'AE',
            link: function(scope, element, attr) {
                element.click( function(e) {
                    $( 'body' ).scrollTop( 0 );
                } );
            }
        };
    } )
    /**
 * Removes server error when user updates input
 */
    .directive( 'mongooseError', function() {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, element, attrs, ngModel) {
                element.on( 'keydown', function() {
                    return ngModel.$setValidity( 'mongoose', true );
                } );
            }
        };
    } )
    .directive( 'match', function match($parse) {
        return {
            require: '?ngModel',
            restrict: 'A',
            link: function(scope, elem, attrs, ctrl) {
                if (!ctrl) {
                    if (console && console.warn) {
                        console.warn( 'Match validation requires ngModel to be on the element' );
                    }
                    return;
                }

                var matchGetter = $parse( attrs.match );

                scope.$watch( getMatchValue, function() {
                    ctrl.$$parseAndValidate();
                } );

                ctrl.$validators.match = function() {
                    return ctrl.$viewValue === getMatchValue();
                };

                function getMatchValue() {
                    var match = matchGetter( scope );
                    if (angular.isObject( match ) && match.hasOwnProperty( '$viewValue' )) {
                        match = match.$viewValue;
                    }
                    return match;
                }
            }
        };
    } )
    .directive( 'integer', function(REGEXP) {
        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {
                ctrl.$validators.integer = function(modelValue, viewValue) {
                    if (ctrl.$isEmpty( modelValue )) {
                        // consider empty models to be valid
                        return true;
                    }

                    if (REGEXP.INTEGER_REGEXP.test( viewValue )) {
                        // it is valid
                        return true;
                    }

                    // it is invalid
                    return false;
                };
            }
        };
    } )
    .directive( 'ipaddress', function() {
        return {
            require: 'ngModel',
            link: function(scope, elem, attrs, ctrl) {
                ctrl.$validators.ipaddress = function(modelValue, viewValue) {
                    if (ctrl.$isEmpty( modelValue )) {
                        return false;
                    }
                    var matcher;
                    if ((matcher = viewValue.match( /^([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})$/ )) != null) {
                        var i;
                        var previous = '255';
                        for (i = 1; i < 5; i++) {
                            var octet = parseInt( matcher[i] );
                            if (octet > 255) return false;
                        }
                        return true;
                    } else {
                        return false;
                    }
                };
            }
        };
    } )

    .directive( 'netmask', function() {
        return {
            require: 'ngModel',
            link: function(scope, elem, attrs, ctrl) {
                ctrl.$validators.netmask = function(modelValue, viewValue) {
                    if (ctrl.$isEmpty( modelValue )) {
                        return false;
                    }
                    var matcher;
                    if ((matcher = viewValue.match( /^([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})$/ )) != null) {
                        var i;
                        var availableMasks = ['255', '254', '252', '248', '240', '224', '192', '128', '0'];
                        var previous = '255';
                        for (i = 1; i < 5; i++) {
                            if (previous === '255' && (availableMasks.indexOf( matcher[i] ) !== -1)) {
                                previous = matcher[i];
                            } else {
                                if (matcher[i] !== '0') {
                                    return false;
                                }
                            }
                        }
                        return true;
                    } else {
                        return false;
                    }
                };
            }
        };
    } )
    .directive( 'realtimeLineChart', ['$window', function($window) {
            return {
                restrict: 'EA',
                link: function(scope, element, attrs, controller) {
                    var d3 = $window.d3;

                    var plot = {
                            margins: null,
                            width: null,
                            height: null,
                            svg: null,
                            isZoomed: false,
                            isGraphCreationDone: false
                        },
                        zoomArea = {
                            height: 50
                        },
                        parseDate = d3.time.format( '%d-%b-%y' ).parse;

                    // Setup size and positions
                    plot.margin = {
                        top: 20,
                        right: 20,
                        bottom: 150,
                        left: 50
                    };
                    plot.width = 960 - plot.margin.left - plot.margin.right;
                    plot.height = 500 - plot.margin.top - plot.margin.bottom;

                    plot.svg = d3.select( 'body' )
                        .append( 'svg' )
                        .attr( 'width', plot.width + plot.margin.left + plot.margin.right )
                        .attr( 'height', plot.height + plot.margin.top + plot.margin.bottom )
                        .append( 'g' )
                        .attr( 'transform', 'translate(' + plot.margin.left + ',' + plot.margin.top + ')' );

                    plot.xScale = d3
                        .time.scale()
                        .range( [0, plot.width] );

                    plot.yScale = d3
                        .scale.linear()
                        .range( [plot.height, 0] );

                    plot.xAxis = d3.svg.axis()
                        .scale( plot.xScale )
                        .orient( 'bottom' );

                    plot.yAxis = d3.svg.axis()
                        .scale( plot.yScale )
                        .orient( 'left' );

                    plot.line = d3.svg.line()
                        .x( function(d) {
                            return plot.xScale( d.date );
                        } )
                        .y( function(d) {
                            return plot.yScale( d.close );
                        } );

                    scope.$watchCollection( 'plotData', function(newData, oldData) {
                        if (newData.length > 0) {
                            if (!plot.isGraphCreationDone) {
                                createGraph( newData );
                            } else {
                                updateGraph( newData );
                            }
                        }
                    } );


                    function createGraph(data) {
                        // Setting the domain of the scales
                        plot.xScale.domain( d3.extent( data, function(d) {
                            return d.date;
                        } ) );
                        plot.yScale.domain( d3.extent( data, function(d) {
                            return d.close;
                        } ) );

                        plot.axis = plot.svg.append( 'g' )
                            .attr( 'class', 'x axis' )
                            .attr( 'transform', 'translate(0,' + plot.height + ')' )
                            .call( plot.xAxis );

                        plot.svg.append( 'g' )
                            .attr( 'class', 'y axis' )
                            .call( plot.yAxis );

                        // Clip to contain the graph inside the plaot area
                        plot.svg.append( 'defs' ).append( 'clipPath' )
                            .attr( 'id', 'clip-plot' )
                            .append( 'rect' )
                            .attr( 'width', plot.width )
                            .attr( 'height', plot.height );

                        plot.path = plot.svg.append( 'path' )
                            .datum( data )
                            .attr( 'clip-path', 'url(#clip-plot)' )
                            .attr( 'class', 'line' )
                            .attr( 'd', plot.line );

                        addZoomArea();
                        plot.isGraphCreationDone = true;
                    }

                    function updateGraph(data) {
                        // Don't update the graph when it's zoomed
                        if (plot.isZoomed) {
                            return;
                        }

                        plot.path
                            .attr( 'd', plot.line )
                            .datum( data )
                            .transition()
                            .duration( 500 )
                            .ease( 'linear' );

                        plot.xScale.domain( d3.extent( data, function(d) {
                            return d.date;
                        } ) );
                        // Zoom's domain is set to the entire data range
                        zoomArea.xScale.domain( d3.extent( scope.allData, function(d) {
                            return d.date;
                        } ) );

                        plot.axis
                            .call( plot.xAxis )
                            .transition()
                            .duration( 500 )
                            .ease( 'linear' );
                        zoomArea.axis
                            .call( zoomArea.xAxis )
                            .transition()
                            .duration( 500 )
                            .ease( 'linear' );
                    }

                    function addZoomArea() {
                        zoomArea.xScale = d3.time.scale()
                            .range( [0, plot.width] )
                            .domain( plot.xScale.domain() );

                        zoomArea.xAxis = d3.svg.axis()
                            .scale( zoomArea.xScale )
                            .tickSize( zoomArea.height )
                            .tickPadding( -10 )
                            .orient( 'bottom' );

                        // Create zoom area
                        zoomArea.svg = d3.svg.area()
                            .x( function(d) {
                                return zoomArea.xScale( d.date );
                            } )
                            .y0( zoomArea.height )
                            .y1( 0 );

                        d3.select( 'body' )
                            .append( 'br' );

                        d3.select( 'body' )
                            .append( 'button' )
                            .text( 'Clear zoom' )
                            .on( 'click', function() {
                                clearBrush();
                            } );

                        var brush = d3.svg.brush()
                            .x( zoomArea.xScale )
                            .on( 'brush', onBrush )
                            .on( 'brushend', onBrushEnd );

                        var context = plot.svg.append( 'g' )
                            .attr( 'class', 'context' )
                            .attr( 'transform', 'translate(0,' + (plot.height + plot.margin.top + zoomArea.height) + ')' );

                        zoomArea.axis = context.append( 'g' )
                            .attr( 'class', 'x axis top' )
                            .attr( 'transform', 'translate(0,0)' )
                            .call( zoomArea.xAxis );

                        context.append( 'g' )
                            .attr( 'class', 'x brush' )
                            .call( brush )
                            .selectAll( 'rect' )
                            .attr( 'y', 0 )
                            .attr( 'height', zoomArea.height );

                        function onBrush() {
                            var b;
                            if (brush.empty()) {
                                plot.isZoomed = false;
                                b = zoomArea.xScale.domain();
                            } else {
                                plot.isZoomed = true;
                                b = brush.extent();
                            }
                            plot.xScale.domain( b );

                            plot.path
                                .datum( scope.allData )
                                .attr( 'd', plot.line );

                            plot.axis.call( plot.xAxis );
                        }

                        function onBrushEnd() {
                            if (brush.empty()) {
                                clearBrush();
                            }
                            // Since it's actually a mouseup event
                            event.stopPropagation();
                        }

                        function clearBrush() {
                            d3.select( '.brush' ).call( brush.clear() );
                            plot.isZoomed = false;
                        }
                    }
                }



            };
        }
        ] );






