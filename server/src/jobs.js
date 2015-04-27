var Agenda = require( 'agenda' );

var agenda;

module.exports = {
    init: function(url) {
        agenda = new Agenda( {
            db: {
                address: url
            }
        } );

        agenda.start();

        return agenda;
    }
};