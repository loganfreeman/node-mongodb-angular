

function fibAsync(n, callback) {
    if (n == 1 || n == 2) {
        callback( 1 );
    } else {
        process.nextTick( function() {
            fibAsync( n - 1, function(val1) {
                process.nextTick( function() {
                    fibAsync( n - 2, function(val2) {
                        callback( val1 + val2 );
                    } );
                } );
            } );
        } );
    }
}

function fibSync(n) {
    if (n == 1 || n == 2) {
        return 1;
    } else {
        return fibSync( n - 1 ) + fibSync( n - 2 );
    }
}


module.exports.fibAsync = fibAsync;
module.exports.fibSync = fibSync;