angular.module( 'metisMenu', [] )
    .directive( 'metisMenu', function() {
        return {
            replace: false,
            restrict: 'EA',
            link: function(scope, element, attrs) {
                return $( '#side-menu' ).metisMenu();

            }
        };
    } );