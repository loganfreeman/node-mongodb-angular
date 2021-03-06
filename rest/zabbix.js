var ZabbixApi = require( 'zabbix-api' );
var expect = require( 'chai' ).expect,
    should = require( 'chai' ).should();

var _ = require( 'lodash' );

var async = require( 'async' );

var controller = require( '../src/controller/zabbixController.js' );

var moment = require( 'moment' );

var Promise = require( 'bluebird' );

var request = Promise.promisify( require( 'request' ) );
// request.debug = true;

var queryString = require( 'querystring' );


describe( 'ZabbixApi', function() {
    this.timeout( 10000 );

    var api_url = 'http://zabbix.cpscloud.com/zabbix/api_jsonrpc.php';
    var client = new ZabbixApi( 'reports', 'yI9SJmVkB5SdM', api_url );
    var fakeone = new ZabbixApi( 'fake', 'fake', api_url );


    describe( 'zabbix routes', function() {
        it( 'should throw item not found', function(done) {
            request( 'http://localhost:8081/zabbix/item/not/found' )
                .spread( function(res, body) {
                    var body = JSON.parse( body );
                    body.code.should.be.eq( 404 );
                    body.message.should.be.eq( 'item not found' );
                    done();
                } )
                .catch( function(err) {
                    console.log( err );
                    done( err );
                } );
        } );

        it( 'should get item', function(done) {
            var options = {
                method: 'POST',
                json: {
                    output: 'extend',
                    search: {
                        'key_': 'system'
                    }
                },
                url: 'http://localhost:8081/zabbix/item/get'
            };
            request( options )
                .spread( function(res, body) {
                    // console.dir( typeof body );
                    _.each( body, function(item) {
                        // console.log( item['key_'] );
                        item['key_'].should.match( /system/i );
                    } );
                    done();
                } )
                .catch( function(err) {
                    done( err );
                } );
        } );
        it( 'should get application', function(done) {
            var options = {
                method: 'POST',
                json: {
                    'output': 'extend',
                    'hostids': '10196',
                    'sortfield': 'name'
                },
                url: 'http://localhost:8081/zabbix/application/get'
            };
            request( options )
                .spread( function(res, body) {
                    done();
                } )
                .catch( function(err) {
                    done( err );
                } );
        } );

        it( 'should check application exists', function(done) {
            var options = {
                method: 'POST',
                json: {
                    'hostid': '10196',
                    'name': 'Memory'
                },
                url: 'http://localhost:8081/zabbix/application/exists'
            };
            request( options )
                .spread( function(res, body) {
                    body.should.be.eq( true );
                    done();
                } )
                .catch( function(err) {
                    done( err );
                } );
        } );

        it( 'should check item exists', function(done) {
            var options = {
                method: 'POST',
                json: {
                    'hostids': '10196'
                },
                url: 'http://localhost:8081/zabbix/item/exists'
            };
            request( options )
                .spread( function(res, body) {
                    body.should.be.eq( true );
                    done();
                } )
                .catch( function(err) {
                    done( err );
                } );
        } );

        it( 'should get maintenance', function(done) {
            var options = {
                method: 'POST',
                json: {
                    'output': 'extend',
                    'selectGroups': 'extend',
                    'selectTimeperiods': 'extend'
                },
                url: 'http://localhost:8081/zabbix/maintenance/get'
            };
            request( options )
                .spread( function(res, body) {
                    done();
                } )
                .catch( function(err) {
                    done( err );
                } );
        } );

        it( 'should get host interface', function(done) {
            var options = {
                method: 'POST',
                json: {
                    'output': 'extend',
                    'hostids': '10196'
                },
                url: 'http://localhost:8081/zabbix/hostinterface/get'
            };
            request( options )
                .spread( function(res, body) {
                    done();
                } )
                .catch( function(err) {
                    done( err );
                } );
        } );

        it( 'should get host group', function(done) {
            var options = {
                method: 'POST',
                json: {
                    'output': 'extend',
                    'filter': {
                        'name': [
                            'Zabbix servers',
                            'Linux servers'
                        ]
                    }
                },
                url: 'http://localhost:8081/zabbix/hostgroup/get'
            };
            request( options )
                .spread( function(res, body) {
                    body.length.should.be.eq( 2 );
                    done();
                } )
                .catch( function(err) {
                    done( err );
                } );
        } );

        it( 'should get history', function(done) {
            var options = {
                method: 'POST',
                json: {
                    'output': 'extend',
                    limit: 10
                },
                url: 'http://localhost:8081/zabbix/history/get'
            };
            request( options )
                .spread( function(res, body) {
                    body.length.should.be.eq( 10 );
                    done();
                } )
                .catch( function(err) {
                    done( err );
                } );
        } );

        it( 'should get event', function(done) {
            var options = {
                method: 'POST',
                json: {
                    'output': 'extend',
                    limit: 10
                },
                url: 'http://localhost:8081/zabbix/event/get'
            };
            request( options )
                .spread( function(res, body) {
                    body.length.should.be.eq( 10 );
                    done();
                } )
                .catch( function(err) {
                    done( err );
                } );
        } );

        it( 'should get event', function(done) {
            var options = {
                method: 'POST',
                json: {
                    'output': 'extend',
                    limit: 10
                },
                url: 'http://localhost:8081/zabbix/event/get'
            };
            request( options )
                .spread( function(res, body) {
                    body.length.should.be.eq( 10 );
                    done();
                } )
                .catch( function(err) {
                    done( err );
                } );
        } );

        it( 'should get host', function(done) {
            var options = {
                method: 'POST',
                json: {
                    'output': 'extend',
                    groupids: 2
                },
                url: 'http://localhost:8081/zabbix/host/get'
            };
            request( options )
                .spread( function(res, body) {
                    body.length.should.be.gt( 0 );
                    done();
                } )
                .catch( function(err) {
                    done( err );
                } );
        } );


    } );


    describe( 'zabbixController', function() {



        it( 'should get application', function(done) {
            controller.getApplication( {
                'output': 'extend',
                'hostids': '10001',
                'sortfield': 'name'
            } )
                .then( function(result) {
                    // console.dir( result );
                    done();
                } )
                .catch( function(err) {
                    done( err );
                } );
        } );

        it( 'should check application exists', function(done) {
            controller.applicationExists( {
                'name': 'Memory'
            } )
                .then( function(result) {
                    result.should.be.eq( true );
                    done();
                } )
                .catch( function(err) {
                    done( err );
                } );
        } );
        it( 'should get item', function(done) {
            controller.getItem( {
                'output': 'extend',
                'search': {
                    'key_': 'system'
                }
            } )
                .then( function(result) {
                    //console.dir( result );
                    done();
                } )
                .catch( function(err) {
                    done( err );
                } );
        } );

        it( 'should check item exists', function(done) {
            controller.itemExists( {
                'key_': 'vm.memory.size[available]'
            } )
                .then( function(result) {
                    result.should.be.eq( true );
                    done();
                } )
                .catch( function(err) {
                    done( err );
                } );
        } );

        it( 'should get host maintenance', function(done) {
            controller.getMaintenance( {
                'output': 'extend',
                'selectGroups': 'extend',
                'selectTimeperiods': 'extend'
            } )
                .then( function(result) {
                    console.dir( result );
                    done();
                } )
                .catch( function(err) {
                    done( err );
                } );
        } );

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