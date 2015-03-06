var ZabbixApi = require( 'zabbix-api' );
var expect = require( 'chai' ).expect,
    should = require( 'chai' ).should();


describe( 'ZabbixApi', function() {
    var api_url = 'http://zabbix.cpscloud.com/zabbix/api_jsonrpc.php';
    var client = new ZabbixApi( 'reports', 'yI9SJmVkB5SdM', api_url );
    var fakeone = new ZabbixApi( 'fake', 'fake', api_url );

    describe( '#login', function() {
        it( 'should return an auth token', function(done) {
            client.login( function(err, res) {
                should.not.exist( err );
                expect( res ).to.be.a( 'string' );
                done();
            } );
        } );

        it( 'should return an error when user or password is incorrect', function(done) {
            fakeone.login( function(err, result) {
                err.should.be.an.instanceof( Object )
                    .and.have.property( 'message' )
                    .with.match( /Invalid params/ );
                should.not.exist( result );
                done();
            } );
        } );

    } );

    describe( '#request', function() {
        var hostid = '10300';
        it( 'should return an array of object containing property `hostid`', function(done) {
            client.request( 'host.get', {
                hostids: hostid
            }, function(err, result) {
                    should.not.exist( err );
                    result.should.be.instanceof( Array ).and.lengthOf( 1 );
                    result[0].should.have.property( 'hostid' ).with.equal( hostid );
                    done();
                } );
        } );

        it( 'should reutrn error when authentication failed', function(done) {
            fakeone.request( 'host.get', {
                hostids: hostid
            }, function(err, result) {
                    should.not.exist( result );
                    err.should.be.instanceof( Object );
                    done();
                } );
        } );
    } );

} );