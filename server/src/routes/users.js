var uuid = require( 'node-uuid' );

var userController = require( '../controller/userController.js' );

var groupController = require( '../controller/groupController.js' );

module.exports = function(app) {
    // Build Express Routes (CRUD routes for /users)


    app.post( '/login', function(req, res) {

        userController.login( req.body.username, req.body.password )
            .then( function(user) {
                req.session.user = user;
                res.json( user );
            } )
            .catch( function(e) {
                res.status( 500 ).send( e );
            } );

    } );


    app.get( '/user/:userid/groups', function(req, res) {
        var userid = req.params.userid;
        groupController.getGroupsByUserId( userid )
            .then( function(groups) {
                res.json( groups );
            } )
            .catch( function(err) {
                res.status( 500 ).send( e );
            } );
    } );


    app.get( '/logout', function(req, res) {
        req.session = null;
        res.redirect( '/dashboard/' );
    } );

    app.get( '/users', function(req, res) {
        userController.getUsers()
            .then( function(users) {
                res.json( users );
            } )
            .catch( function(err) {
                res.status( 500 ).send( err );
            } );
    } );

    app.put( '/user', function(req, res) {
        app.models.users.create( req.body, function(err, model) {
            if (err) return res.json( {
                    err: err
                }, 500 );
            res.json( model );
        } );
    } );

    app.get( '/user/:id', function(req, res) {
        var userid = req.params.id;
        userController.getUserById( userid )
            .then( function(user) {
                res.json( user );
            } )
            .catch( function(err) {
                res.status( 500 ).send( err );
            } );
    } );

    app.delete( '/user/:id', function(req, res) {
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

    app.post( '/user/:id', function(req, res) {
        // Don't pass ID to update
        // delete req.body.id;

        console.log( 'Updating user id ' + req.params.id );

        app.models.users.update( {
            id: req.params.id
        }, req.body, function(err, model) {
                if (err) return res.json( {
                        err: err
                    }, 500 );
                res.json( model );
            } );
    } );
};