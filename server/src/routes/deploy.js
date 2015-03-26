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
};