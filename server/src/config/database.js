
var authentication = {
    production: {
        database: 'devops_dashboard',
        username: 'ops_dashboard',
        password: 'Najmacjeid'
    },
    development: {
        database: 'todo',
        username: 'michael',
        password: 'root'
    }
};


module.exports = {

    authentication: authentication,

    getAuthen: function() {

        switch (process.env.NODE_ENV) {
            case 'production':
                return authentication.production;
            default:
                return authentication.development;
        }
    }

};