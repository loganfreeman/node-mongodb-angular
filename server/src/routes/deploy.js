var db = require('../models');

var deployController = require('../controller/deployController.js');

module.exports = function(app) {
	app.get('/deploys', function(req, res) {
		deployController.getDeploys()
			.then(function(deploys) {
				res.json(deploys);
			})
			.catch(function(e) {
				res.status(500).send(e);
			})
	});

	app.get('/deploy/:id', function(req, res) {
		deployController.getDeployById(req.params.id)
			.then(function(deploy) {
				res.json(deploy);
			})
			.catch(function(e) {
				res.status(500).send(e);
			})
	});

	app.put('/deploy', function(req, res) {
		deployController.create(req.body)
			.then(function(deploy) {
				res.json(deploy);
			})
			.catch(function(err) {
				res.status(500).send(err);
			})
	})


	app.get('/deploys/instance/:instanceid', function(req, res) {
		var instanceid = req.params.instanceid;
		deployController.getDeployByInstance(instanceid)
			.then(function(deploys) {
				res.json(deploys);
			})
			.catch(function(e) {
				res.status(500).send(e);
			})
	});

	app.delete('/deploy/:id', function(req, res) {
		deployController.delete(req.params.id)
			.then(function() {
				res.status(200).send('OK');
			})
			.catch(function(err) {
				res.status(500).send(err);
			})
	})


};