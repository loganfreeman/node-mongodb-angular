var ZabbixApi = require( 'zabbix-api' );
var expect = require( 'chai' ).expect,
    should = require( 'chai' ).should();

var _ = require( 'lodash' );

var async = require( 'async' );

var controller = require( '../src/controller/zabbixController.js' );

var moment = require( 'moment' );


describe( 'ZabbixApi', function() {
    this.timeout( 5000 );

    var api_url = 'http://zabbix.cpscloud.com/zabbix/api_jsonrpc.php';
    var client = new ZabbixApi( 'reports', 'yI9SJmVkB5SdM', api_url );
    var fakeone = new ZabbixApi( 'fake', 'fake', api_url );


    describe( 'zabbixController', function() {

        it( 'should check maintenance exists', function(done) {
            controller.maintenanceExists( {
                'name': 'Sunday maintenance'
            } )
                .then( function(result) {
                    result.should.be.eq( false );
                    done();
                } )
                .catch( function(err) {
                    done( err );
                } );
        } );

        it( 'should get host interface', function(done) {
            controller.getHostInterface( {
                'output': 'extend',
                'hostids': '30057'
            } )
                .then( function(result) {
                    done();
                } )
                .catch( function(err) {
                    done( err );
                } );
        } );

        it( 'should check host interface', function(done) {
            controller.hostInterfaceExists( {
                'ip': '127.0.0.1'
            } )
                .then( function(result) {
                    done();
                } )
                .catch( function(err) {
                    done( err );
                } );
        } );

        it( 'should get host groups', function(done) {
            controller.getHostGroup( {
                'filter': {
                    'name': [
                        'Zabbix servers',
                        'Linux servers'
                    ]
                }
            } )
                .then( function(groups) {
                    console.dir( groups );
                    done();
                } )
                .catch( function(err) {
                    done( err );
                } );
        } );

        it( 'should check hostgroup exists', function(done) {
            controller.hostGroupExists( {
                'name': 'Linux servers'
            } )
                .then( function(result) {
                    done();
                } )
                .catch( function(err) {
                    done( err );
                } );
        } );

        it( 'should get hosts', function(done) {
            controller.getHost( {
                'output': ['hostid'],
                'selectGroups': 'extend'
            } )
                .then( function(hosts) {
                    done();
                } )
                .catch( function(err) {
                    done( err );
                } );
        } );

        it( 'should check host exist', function(done) {
            controller.checkHost( {
                'host': 'zabbix server'
            } )
                .then( function(res) {
                    res.should.be.eq( false );
                    done();
                } )
                .catch( function(err) {
                    done( err );
                } );
        } );

        it( 'should retrieve service availability', function(done) {
            controller.getServiceAvailability( '1', [{
                'from': +moment().subtract( 1, 'days' ).toDate(),
                'to': +new Date
            }] )
                .then( function(res) {
                    //console.log( JSON.stringify( res ) );
                    done();
                } )
                .catch( function(e) {
                    done( e );
                } );
        } );
        it( 'should get history', function(done) {
            controller.getHistory( {
                limit: 10
            } )
                .then( function(res) {
                    //console.log( res );
                    done();
                } )
                .catch( function(e) {
                    done( e );
                } );
        } );

        it( 'should get event', function(done) {
            controller.getEvent( {
                limit: 10
            } )
                .then( function(res) {
                    //console.log( res );
                    done();
                } )
                .catch( function(e) {
                    done( e );
                } );
        } );
    } );

    describe( '#login', function() {
        it( 'should return an auth token', function(done) {
            client.login( function(err, res) {
                should.not.exist( err );
                expect( res ).to.be.a( 'string' );
                done();
            } );
        } );

        it( 'should return history', function(done) {
            client.request( 'history.get', {
                hostids: 1
            }, function(err, res) {
                    if (err) {
                        done( err );
                    } else {
                        done();
                    }
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

            var run = function() {
                client.request( 'host.get', {
                    hostids: hostid
                }, function(err, result) {
                        should.not.exist( err );
                        result.should.be.instanceof( Array ).and.lengthOf( 1 );
                        result[0].should.have.property( 'hostid' ).with.equal( hostid );
                        done();
                    } );
            };

            _.delay( run, 1000 );


        } );

        it( 'should retry successfully and return an array of object containing property `hostid`', function(done) {
            this.timeout( 7500 );
            var task = function(callback, results) {
                client.request( 'host.get', {
                    hostids: hostid
                }, function(err, result) {
                        callback( err, result );
                    } );
            };

            var callback = function(err, result) {

                should.not.exist( err );
                result.should.be.instanceof( Array ).and.lengthOf( 1 );
                result[0].should.have.property( 'hostid' ).with.equal( hostid );
                done();
            };

            async.retry( 5, task, callback );
        } );

        it( 'should reutrn error when authentication failed', function(done) {
            var run = function() {
                fakeone.request( 'host.get', {
                    hostids: hostid
                }, function(err, result) {
                        should.not.exist( result );
                        err.should.be.instanceof( Object );
                        done();
                    } );
            };

            _.delay( run, 2000 );

        } );
    } );

} );