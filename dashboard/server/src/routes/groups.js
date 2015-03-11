module.exports = function(app){
    app.get('/groups', function (req, res) {
        app.models.groups.find().exec(function (err, models) {
            if (err) return res.json({
                err: err
            }, 500);
            res.json(models);
        });
    });
}