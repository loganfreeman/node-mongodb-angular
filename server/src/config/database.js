
var authentication = {
    production: {
        database: 'ops_dashboard',
        username: 'ops_dashboard',
        password: 'Najmacjeid'
    },
    development: {
        database: 'todo',
        username: 'michael',
        password: 'root'
    },
    devops: {
        database: 'ops_dashboard',
        username: 'ops_dashboard',
        password: 'Najmacjeid'
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