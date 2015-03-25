
var authentication = {
    production: {
        database: 'ops_dashboard',
        username: 'ops_dashboard',
        password: 'Najmacjeid',
        port: 5432
    },
    development: {
        database: 'todo',
        username: 'michael',
        password: 'root',
        port: 5432
    },
    devops: {
        database: 'ops_dashboard',
        username: 'ops_dashboard',
        password: 'Najmacjeid',
        port: 5432
    },
    ops: {
        database: 'ops_dashboard',
        username: 'ops_dashboard',
        password: 'Najmacjeid',
        port: 5433
    }
};


var _ = require( 'lodash' );


module.exports = {

    authentication: authentication,

    getAuthen: function() {

        for (key in authentication) {
            if (key === process.env.NODE_ENV) {
                return authentication[key];
            }
        }

        return authentication.devops;




    }

};