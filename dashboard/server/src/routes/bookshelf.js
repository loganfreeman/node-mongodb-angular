var User = require('../bookshelf/init.js').bookshelf['users'];
var Group = require('../bookshelf/init.js').bookshelf['groups'];

module.exports = function (app) {
    app.get('/bookshelf/users', function (req, res) {
        new User().fetchAll()
            .then(function (users) {
                res.json(users);
            }).catch(function (error) {
                console.log(error);
                res.send('An error occured');
            });
    });
    app.get('/bookshelf/groups', function (req, res) {
        new Group().fetchAll()
            .then(function (groups) {
                res.json(groups);
            }).catch(function (error) {
                console.log(error);
                res.send('An error occured');
            });
    });
};