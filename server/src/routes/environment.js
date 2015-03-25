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
	});


	app.put('/environment', function(req, res) {
		envController.create(req.body)
			.then(function(env) {
				res.json(env);
			})
			.catch(function(err) {
				res.status(500).send(err);
			})
	});

	app.delete('/environment/:id', function(req, res) {
		envController.delete(req.params.id)
			.then(function() {
				res.status(200).send('OK');
			})
			.catch(function(err) {
				res.status(500).send(err);
			})
	})
};