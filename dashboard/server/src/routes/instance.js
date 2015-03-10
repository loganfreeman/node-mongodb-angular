var db = require( '../models' );
module.exports = function(app) {
    app.get( '/instances', function(req, res) {
        db.Instance.findAll().success( function(instances) {
            res.render( 'instances', {
                title: 'isntance list',
                instances: instances
            } );
        } );
    } );
};