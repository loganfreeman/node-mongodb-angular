'use strict';
angular
    .module( 'theme.echo-controllers', [] )
    .controller( 'echoController', function($scope) {
        $scope.reply = '';
        var primus = new Primus();
        primus.on( 'data', function received(data) {
            $scope.reply += data + '\n';
        } );

        $scope.echo = function() {
            primus.write( $scope.message );
            $scope.message = '';
        };
    } );
