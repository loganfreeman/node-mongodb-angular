module.exports = function(app) {
    app.get( '/', function(req, res) {
        res.render( 'users', {
            users: [
                {
                    name: 'tobi',
                    email: 'tobi@learnboost.com'
                },
                {
                    name: 'loki',
                    email: 'loki@learnboost.com'
                },
                {
                    name: 'jane',
                    email: 'jane@learnboost.com'
                }
            ],
            title: 'Users',
            header: 'Some users'
        } );
    } );
};