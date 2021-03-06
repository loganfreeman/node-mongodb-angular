/**
 *
 *
 *
 *
 * @author scheng
 */


var controller = require('../../src/controller/environmentController.js');

var db = require('../../src/jugglingdb/init.js');


var _ = require('lodash');

var expect = require('chai').expect,
    should = require('chai').should();


var helpers = require('../helpers.js');



describe('environmentController', function() {

    it('should return environment by ID', function(done) {
        controller.getEnvironmentById(1)
            .then(function(env) {
                // console.log(JSON.stringify(env));
                env.should.have.property('$stacks');
                helpers.verifyArray(env.$stacks, db['stack']);
                done();
            })
            .catch(function(err) {
                done(err);
            })
    });

    it('should return environments', function(done) {
        controller.getEnvironments()
            .then(function(models) {


                helpers.verifyArray(models, db['environment']);
                // environment should have many stacks
                _.each(models, function(model) {
                    /*model.stacks(function(err, stacks) {
                        helpers.verifyArray(stacks, db['stack']);
                    });*/
                    model.should.have.property('$stacks');
                    helpers.verifyArray(model.$stacks, db['stack']);
                });
                done();
            }, function(err) {
                done(err);
            });
    });

    it('should create new environment', function(done) {
        var data = {
            name: 'stage',
            description: 'stage environment'
        };
        controller.create(data)
            .then(function(model) {
                model.should.be.instanceof(db['environment']);
                model.should.have.property('id');
                done();
            }, function(err) {
                if (helpers.keyExists(err)) {
                    done();
                } else {
                    done(err);
                }
            });
    });

    it('should delete env', function(done) {
        var data = {
            name: 'temp',
            description: 'temp environment'
        };
        controller.create(data)
            .then(function(env) {
                return controller.delete(env.id);
            })
            .then(function(env) {
                done();
            })
            .catch(function(err) {
                done(err);
            })
    })
});