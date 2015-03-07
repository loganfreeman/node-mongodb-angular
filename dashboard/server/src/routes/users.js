module.exports = function(app) {
    // Build Express Routes (CRUD routes for /users)

    app.get( '/users', function(req, res) {
        app.models.users.find().exec( function(err, models) {
            if (err) return res.json( {
                    err: err
                }, 500 );
            res.json( models );
        } );
    } );

    app.post( '/users/add', function(req, res) {
        app.models.users.create( {
            firstName: req.body.firstname,
            lastName: req.body.lastname
        }, function(err, model) {
                if (err) return res.json( {
                        err: err
                    }, 500 );
                res.json( model );
            } );
    } );

    app.get( '/users/edit/:id', function(req, res) {
        app.models.users.findOne( {
            id: req.params.id
        }, function(err, model) {
                if (err) return res.json( {
                        err: err
                    }, 500 );
                res.json( model );
            } );
    } );

    app.delete( '/users/delete/:id', function(req, res) {
        app.models.users.destroy( {
            id: req.params.id
        }, function(err) {
                if (err) return res.json( {
                        err: err
                    }, 500 );
                res.json( {
                    status: 'ok'
                } );
            } );
    } );

    app.post( '/users/edit/:id', function(req, res) {
        // Don't pass ID to update
        delete req.body.id;

        app.models.users.update( {
            id: req.params.id
        }, {
                firstName: req.body.firstname,
                lastName: req.body.lastname
            }, function(err, model) {
                if (err) return res.json( {
                        err: err
                    }, 500 );
                res.json( model );
            } );
    } );
};