var expect = require( 'chai' ).expect,
    should = require( 'chai' ).should();

describe( 'redis', function() {
    describe( '#pwd', function() {
        it( 'should not return error', function() {
            // http://nodejs.org/api.html#_child_processes
            var sys = require( 'sys' );
            var exec = require( 'child_process' ).exec;
            var child;

            // executes `pwd`
            child = exec( 'pwd', function(error, stdout, stderr) {
                sys.print( 'stdout: ' + stdout );
                // sys.print( 'stderr: ' + stderr );
                should.not.exist( stderr );
                if (error !== null) {
                    console.log( 'exec error: ' + error );
                }
            } );
        } );

        it( 'should return pong', function() {
            var sys = require( 'sys' );
            var exec = require( 'child_process' ).exec;
            var child;

            // executes `pwd`
            child = exec( 'redis-cli ping', function(error, stdout, stderr) {
                stdout.should.be.eq( 'PONG\n' );
                // sys.print( 'stderr: ' + stderr );
                should.not.exist( stderr );
                if (error !== null) {
                    console.log( 'exec error: ' + error );
                }
            } );
        } );


        it( 'should set key successfully', function(done) {
            var redis = require( 'redis' ),
                client = redis.createClient();

            // if you'd like to select database 3, instead of 0 (default), call
            // client.select(3, function() { /* ... */ });

            client.on( 'error', function(err) {
                console.log( 'Error ' + err );
                done( err );
            } );

            client.set( 'string key', 'string val', redis.print );
            client.hset( 'hash key', 'hashtest 1', 'some value', redis.print );
            client.hset( ['hash key', 'hashtest 2', 'some other value'], redis.print );
            client.hkeys( 'hash key', function(err, replies) {
                should.not.exist( err );
                console.log( replies.length + ' replies:' );
                replies.length.should.be.eq( 2 );
                replies.forEach( function(reply, i) {
                    console.log( '    ' + i + ': ' + reply );
                } );
                client.quit();
                done();
            } );
        } );
    } );
} );