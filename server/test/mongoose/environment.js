/**
 * Module dependencies.
 */

var _ = require('lodash');

var expect = require('chai').expect,
    should = require('chai').should();

var mongoose = require('mongoose');


require('../../src/mongoose/models');

var Promise = require('bluebird');



/**
 * Mongoose connection helper.
 */

function connect(database) {
    return mongoose.createConnection('mongodb://localhost/' + database);
}


describe('user schema', function() {

    this.timeout(5000);
    var db, Environment, Stack;

    before(function(done) {
        // add dummy data
        db = connect('test');
        Environment = db.model('Environment');
        Stack = db.model('Stack');

        var environment = Environment.create({
            name: 'sample Environment'
        });

        var stackPromise = Stack.create({
            name: 'stack #1'
        });

        var stackPromise1 = Stack.create({
            name: 'stack #2'
        });

        var envId;

        environment
            .then(function(env) {
                envId = env.id;
                env.name.should.be.eq('sample Environment');
                Promise.all([stackPromise, stackPromise1])
                    .then(function(values) {
                        Promise.resolve(values)
                            .map(function(stack) {
                                stack.environment = env._id;
                                return stack.save();
                            })
                            .then(function(savePromises) {
                                Promise.all(savePromises)
                                    .then(function(stacks) {
                                        _.each(stacks, function(stack) {
                                            stack.environment.toString().should.be.eq(envId);
                                        });
                                        done();
                                    })
                            })

                    })

            })
    });

    after(function(done) {
        // clean up the test db
        db.db.dropDatabase(function() {
            db.close();
            done();
        });
    });



    it('should load by Id', function(done) {
        Environment.findOne({
                name: 'sample Environment'
            }).exec()
            .then(function(env) {
                env.stacks.length.should.be.eq(2);
                env.name.should.be.eq('sample Environment');
                env.description = 'set by unit test';
                env.save().should.be.instanceOf(mongoose.Promise);
                env.save().then(function(env) {
                    // console.log(env);
                    env.description.should.be.eq('set by unit test');
                    done();
                })

            })
    });

});