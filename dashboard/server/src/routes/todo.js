var db = require( '../models' );

module.exports = function(app) {

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
        } );
    } );
    app.put( '/todos/edit', function(req, res) {
        db.Todo.find( {
            where: {
                'id': req.body.id
            },
            limit: 1
        } ).success( function(todo) {
            todo.updateAttributes( {
                text: req.body.text
            } ).success( function(updated) {
                res.json( updated );
            } );
        } );
    } );
    app.del( '/todos/delete', function(req, res) {
        db.Todo.find( {
            where: {
                'id': req.body.id
            },
            limit: 1
        } ).success( function(todo) {
            todo.destroy().success( function(destroyed) {
                res.json( {
                    id: req.body.id,
                    deleted: true
                } );
            } );
        } );
    } );
};