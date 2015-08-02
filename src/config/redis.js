module.exports = function(callback) {
    var sys = require( 'sys' );
    var exec = require( 'child_process' ).exec;
    var child;

    // executes `pwd`
    child = exec( 'redis-cli ping', function(error, stdout, stderr) {
        sys.print( 'redis-cli ping: ' + stdout );
        if (error !== null) {
            console.log( 'exec error: ' + error );
            exit( 1 );
        }
        callback();
    } );
};