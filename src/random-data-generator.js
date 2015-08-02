var EventEmitter = require( 'events' ).EventEmitter,
    moment = require( 'moment' );

var EMIT_INTERVAL = 2 * 1000; // 2s

function RandomDataGenerator() {
    var self = this,
        data = generateRandomData();
    setInterval( function() {
        self.emit( 'data', generateRandomData() );
    }, EMIT_INTERVAL );
}

RandomDataGenerator.prototype = new EventEmitter();

// As per the tsv
var latestDate = '1-May-12';
function generateRandomData() {
    var close = generateRandomNumber( 550, 600 ), // Generate random close value
        randomDays = generateRandomNumber( 1, 7 ); // Keep the next date within a week for a ordered chart

    latestDate = moment( latestDate, 'DD-MMM-YY' ).add( randomDays, 'days' ).format( 'DD-MMM-YY' );

    return latestDate + '\t' + close;
}

function generateRandomNumber(lowerLimit, upperLimit) {
    // http://stackoverflow.com/a/1527820
    return Math.floor( Math.random() * (upperLimit - lowerLimit + 1) ) + lowerLimit;
}

module.exports = {
    RandomDataGenerator: RandomDataGenerator
};