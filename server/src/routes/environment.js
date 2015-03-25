var envController = require('../controller/environmentController.js');

module.exports = function(app) {
	app.get('/environments', function(req, res) {
		envController.getEnvironments()
			.then(function(models) {
				res.json(models);
			})
			.catch(function(e) {
				res.status(500).send(e);
			});
	});

	app.get('/environment/:id', function(req, res) {
		envController.getEnvironmentById(req.params.id)
			.then(function(env) {
				res.json(env);
			})
			.catch(function(err) {
				res.status(500).send(err);
			})
	})
};