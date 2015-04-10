describe( 'Session', function() {

    var $httpBackend;
    var $rootScope;

    var Session;

    // First, we load the app's module
    beforeEach( module( 'angularPassportService' ) );
    beforeEach( module( 'ngResource' ) );
    beforeEach( module( 'ngCookies' ) );

    beforeEach( inject( function($injector) {
        $httpBackend = $injector.get( '$httpBackend' );
        $rootScope = $injector.get( '$rootScope' );
        Session = $injector.get( 'Session' );
    } ) );


    it( 'should run', function() {
        console.log( 'test run' );
        expect( Session ).toBeDefined();
    } );

    it( 'should define Auth factory', inject( function(Auth) {
        expect( Auth ).toBeDefined();
    } ) );
    // individual tests go here
} );