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
			"stacks": ["552f4d6877b85a3436e7f1fd", "552f4d8477b85a3436e7f1fe"],
			"serviceType": "PCP"
		};


		var options = {
			url: 'http://localhost:8081/devops/instance/552f4d4d77b85a3436e7f1fc?secret=secret',
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
							return stack._id == '552f4d8477b85a3436e7f1fe';
						})
						console.log(stack);
						done();
					})
			})
			.catch(function(e) {
				done(e);
			});

	});


	it('should associate stack with instance', function(done) {

		var data = {
			"instances": ["552f4d4d77b85a3436e7f1fc", "552f50850a21178425f7645a"],
			"serviceType": "PCP"
		};


		var options = {
			url: 'http://localhost:8081/devops/stack/552f4d8477b85a3436e7f1fe?secret=secret',
			json: data,
			method: 'POST'
		};
		request(options)
			.spread(function(res, body) {
				console.log(body);
				// done();
				request('http://localhost:8081/devops/instance?secret=secret')
					.spread(function(res, body) {
						var stacks = JSON.parse(body);
						var stack = _.find(stacks, function(stack) {
							//console.log(stack);
							return stack._id == '552f4d4d77b85a3436e7f1fc';
						})
						console.log(stack);
						done();
					})
			})
			.catch(function(e) {
				done(e);
			});

	});


})