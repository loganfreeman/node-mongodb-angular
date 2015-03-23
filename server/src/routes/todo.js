var db = require( '../models' );

var readFile = Promise.promisify( require( 'fs' ).readFile );

var config = require( '../config/config.js' );

module.exports = function(app) {


    app.get( '/server/log', function(req, res) {
        readFile( config.server.log )
            .then( function(contents) {
                res.send( contents );
            } )
            .catch( function(e) {
                res.status( 500 ).send( e );
            } );
    } );

    app.get( '/todos', function(req, res) {
        db.Todo.findAll().success( function(todos) {
            res.render( 'todos', {
                title: 'to do list',
                todos: todos
            } );
        } );
    } );
    app.post( '/todos/add', function(req, res) {
        db.Todo.create( {
            text: req.body.text
        } ).success( function(todo) {
            res.redirect( '/todos' );
        } ).error( function(err) {
            res.render( 'error', {
                error: err.name,
                message: err.message
            } );
        } );
    } );
    app.get( '/todos/edit/:id', function(req, res) {
        db.Todo.find( {
            where: {
                'id': req.param( 'id' )
            },
            limit: 1
        } ).success( function(todo) {
            res.render( 'todo-item', {
                title: 'Edit ToDo Item',
                todo: todo
            } );
        } );
    } );
    app.post( '/todos/edit/:id', function(req, res) {
        db.Todo.find( {
            where: {
                'id': req.param( 'id' )
            },
            limit: 1
        } ).success( function(todo) {
            todo.updateAttributes( {
                text: req.body.text
            } ).success( function(updated) {
                res.redirect( '/todos' );
            } );
        } );
    } );
    app.delete( '/todos/delete/:id', function(req, res) {
        db.Todo.find( {
            where: {
                'id': req.param( 'id' )
            },
            limit: 1
        } ).success( function(todo) {
            todo.destroy().success( function(destroyed) {
                res.json( {
                    id: req.param( 'id' ),
                    deleted: true
                } );
            } );
        } );
    } );
};