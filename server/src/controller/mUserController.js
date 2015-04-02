var Promise = require( 'bluebird' );

var User = require( '../mongoose/models' ).User;


var load = Promise.promisify( User.load );


module.exports = {
    getUser: function(criteria) {
        var options = {
            criteria: criteria
        };

        return load( options );
    }
};