'use strict';
angular
    .module( 'theme.echo-controllers', ['rx'] )
    .controller( 'echoController', function($scope, rx, $http) {
        $scope.reply = '';
        var primus = new Primus();
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
