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

describe('deploy routes', function() {
	it('should get deploys', function(done) {
		request('http://localhost:8081/deploys')
			.spread(function(res, deploys) {
				var deploys = JSON.parse(deploys);
				_.each(deploys, function(instance) {
					instance.should.have.property('instance_id');
				})
				done();
			})
			.catch(function(err) {
				done(err);
			})
	})
})