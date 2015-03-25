var expect = require( 'chai' ).expect,
    should = require( 'chai' ).should();

var redisHook = require( '../src/config/redis.js' );

var os = require('os');

describe( 'redis', function() {
    describe( '#pwd', function() {
        it( 'should not return error', function() {

            // http://nodejs.org/api.html#_child_processes
            var sys = require( 'sys' );
            var exec = require( 'child_process' ).exec;
            var child;

            switch(os.platform()){
                case 'win32':
                    checkWindows();
                    break;
                case 'darwin':
                    checkLinux();
                    break;
                case 'linux':
                    checkLinux();
                    break;
                default:
                    break;
            }

            function checkLinux(){
                // executes `pwd`
                child = exec( 'pwd', function(error, stdout, stderr) {
                    sys.print( 'stdout: ' + stdout );
                    // sys.print( 'stderr: ' + stderr );
                    should.not.exist( stderr );
                    if (error !== null) {
                        console.log( 'exec error: ' + error );
                    }
                } );
            }

            function checkWindows(){

            }


        } );


        it( 'should return no error from redis hook', function(done) {
            var cb = function() {
                done();
            };

            redisHook( cb );
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


    } );
} );