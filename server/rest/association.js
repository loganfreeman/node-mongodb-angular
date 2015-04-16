var Promise = require('bluebird');
var request = Promise.promisify(require('request'));
// request.debug = true;

var queryString = require('querystring');

var db = require('../src/jugglingdb/init.js');


var _ = require('lodash');

var http = require('http');

var helpers = require('../test/helpers.js');

var expect = require('chai').expect,
	should = require('chai').should();

var assert = require('assert');

var uuid = require('node-uuid');


describe('association', function() {
	it('should associate stack with instance', function(done) {

		var data = {
			"stacks": ["5528c7fe837aed7412528edc", "552f00d07ff6c2700a02b708", "552f00d87ff6c2700a02b709", "552f00d07ff6c2700a02b708"],
			"serviceType": "PCP"
		};


		var options = {
			url: 'http://localhost:8081/devops/instance/552f01827ff6c2700a02b710?secret=secret',
			json: data,
			method: 'POST'
		};
		request(options)
			.spread(function(res, body) {
				console.log(body);
				// done();
				request('http://localhost:8081/devops/stack?secret=secret')
					.spread(function(res, body) {
						var stacks = JSON.parse(body);
						var stack = _.find(stacks, function(stack) {
							//console.log(stack);
							return stack._id == '552f00d07ff6c2700a02b708';
						})
						console.log(stack);
						done();
					})
			})
			.catch(function(e) {
				done(e);
			});

	})
})