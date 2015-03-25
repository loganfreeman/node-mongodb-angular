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


describe('environment routes', function() {
    it('should return all environments', function(done) {
        request('http://localhost:8081/environments')
            .spread(function(res, body) {
                var environs = JSON.parse(body);
                helpers.isJSONArray(environs);
                _.each(environs, function(env) {
                    env.should.have.property('$stacks');
                })
                done();
            })
            .catch(function(e) {
                done(e);
            });
    });

    it('should get environment by ID', function(done) {
        request('http://localhost:8081/environment/1')
            .spread(function(res, body) {
                var environment = JSON.parse(body);
                environment.should.have.property('$stacks');
                done();
            })
            .catch(function(err) {
                done(err);
            })
    });

    it('should create then delete', function(done) {
        var environment = {
            name: 'temp11111',
            description: 'temp environment'
        };
        var options = {
            method: 'PUT',
            url: 'http://localhost:8081/environment',
            json: environment
        };
        request(options)
            .spread(function(res, body) {
                if (res.statusCode != 200) {
                    throw Error(JSON.stringify(body));
                };

                return body;
            })
            .then(function(env) {

                env.should.have.property('stacks');
                env.stacks.length.should.be.eq(0);
                var options = {
                    method: 'DELETE',
                    url: 'http://localhost:8081/environment/' + env.id
                };
                request(options).
                spread(function(res, body) {
                        done();
                    })
                    .catch(function(err) {
                        done(err);
                    })
            })
            .catch(function(err) {
                done(err);
            })
    })
});