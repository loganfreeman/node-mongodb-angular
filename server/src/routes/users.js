module.exports = function (app) {
    // Build Express Routes (CRUD routes for /users)


    app.post('/login', function (req, res) {
        var user = {
            firtname: 'michael',
            lastname: 'collins',
            name: 'michael.collins@contactpointsolutions.com',
            email: 'michael.collins@contactpointsolutions.com',
            id: 1
        };
        req.session.user = user;

        res.redirect('/dashboard');
    });


    app.get('/logout', function (req, res) {
        req.session = null;
        res.redirect('/dashboard');
    });

    app.get('/users', function (req, res) {
        app.models.users.find().exec(function (err, models) {
            if (err) return res.json({
                err: err
            }, 500);
            res.json(models);
        });
    });

    app.put('/user', function (req, res) {
        app.models.users.create(req.body, function (err, model) {
            if (err) return res.json({
                err: err
            }, 500);
            res.json(model);
        });
    });

    app.get('/user/:id', function (req, res) {
        app.models.users.findOne({
            id: req.params.id
        }, function (err, model) {
            if (err) return res.json({
                err: err
            }, 500);
            res.json(model);
        });
    });

    app.delete('/user/:id', function (req, res) {
        app.models.users.destroy({
            id: req.params.id
        }, function (err) {
            if (err) return res.json({
                err: err
            }, 500);
            res.json({
                status: 'ok'
            });
        });
    });

    app.post('/user/:id', function (req, res) {
        // Don't pass ID to update
        // delete req.body.id;

        console.log("Updating user id " +req.params.id);

        app.models.users.update({
            id: req.params.id
        }, req.body, function (err, model) {
            if (err) return res.json({
                err: err
            }, 500);
            res.json(model);
        });
    });
};