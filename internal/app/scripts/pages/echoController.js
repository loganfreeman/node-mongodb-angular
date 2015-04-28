'use strict';
angular
    .module( 'theme.echo-controllers', ['rx'] )
    .factory( 'primus', function() {
        return new Primus();
    } )
    .factory( 'chartRealtime', function($location) {
        return new Primus( [$location.protocol(), '://', $location.host(), ':', $location.port(), '?type=chart'].join( '' ) );
    } )
    .controller( 'realTimeChartController', function($scope, $http, $window, chartRealtime) {
        var parseDate = $window.d3.time.format( '%d-%b-%y' ).parse;
        $scope.allData = [];
        $scope.plotData = [];

        $http.get( '/data/initial-data.tsv' )
            .success( function(data) {
                initScope( data );
            } );
        chartRealtime.on( 'data', updateScope );

        function initScope(tsvData) {
            // Use d3's tsv method to parse tsv to object array
            var data = $window.d3.tsv.parse( tsvData );
            data.forEach( function(d) {
                d.date = parseDate( d.date );
                d.close = parseInt( d.close );
            } );

            // Clone array
            $scope.allData = data.slice( 0 );
            $scope.plotData = data.slice( 0 );
        }


        function updateScope(data) {
            console.log( data );
            var date = data.split( '\t' )[0],
                price = data.split( '\t' )[1];
            data = {
                close: parseInt( price ),
                date: parseDate( date )
            };
            // Keep track of all the data
            $scope.allData.push( data );
            // plotData holds only the data for the current graph 'window'
            $scope.plotData.push( data );
            $scope.plotData.shift();
            // Trigger the digest cycle since this's not a angular builtin
        }
    } )
    .controller( 'echoController', function($scope, rx, $http, primus) {
        $scope.reply = '';
        // var primus = new Primus();
        primus.on( 'data', function received(data) {
            $scope.reply += data + '\n';
        } );

        $scope.echo = function() {
            primus.write( $scope.message );
            $scope.message = '';
        };

        //Reactive Angular
        function searchWikipedia(term) {
            return rx.Observable
                .fromPromise( $http( {
                    url: 'http://en.wikipedia.org/w/api.php?&callback=JSON_CALLBACK',
                    method: 'jsonp',
                    params: {
                        action: 'opensearch',
                        search: term,
                        format: 'json'
                    }
                } ) )
                .map( function(response) {
                    return response.data[1];
                } );
        }

        $scope.search = '';
        $scope.results = [];

        /*
          Creates a "click" function which is an observable sequence instead of just a function.
        */
        $scope.$createObservableFunction( 'click' )
            .map( function() {
                return $scope.search;
            } )
            .flatMapLatest( searchWikipedia )
            .subscribe( function(results) {
                $scope.results = results;
            } );
    } );