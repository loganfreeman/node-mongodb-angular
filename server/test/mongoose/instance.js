var _ = require('lodash');

var expect = require('chai').expect,
    should = require('chai').should();

var mongoose = require('mongoose');


require('../../src/mongoose/models');

var Promise = require('bluebird');

var utils = require('../../src/resources/utils.js');

function connect(database) {
    return mongoose.createConnection('mongodb://localhost/' + database);
}


describe('#instance#', function() {
    var db, Instance, Stack;

    var stacks = [];

    before(function(done) {
        // add dummy data
        db = connect('test');
        Stack = db.model('Stack');
        Instance = db.model('Instance');


        var stackPromise = Stack.create({
            name: 'stack #1'
        });

        var stackPromise1 = Stack.create({
            name: 'stack #2'
        });

        var instanceP1 = Instance.create({
            name: 'a',
            serviceType: 'PCP'
        });
        var instanceP2 = Instance.create({
            name: 'b',
            serviceType: 'PCP'
        });

        var envId, stack;

        Promise.all([stackPromise, stackPromise1, instanceP1, instanceP2])
            .then(function(values) {

                stacks.push(values.shift());
                stacks.push(values.shift());
                done();
            });

    });

    after(function(done) {
        // clean up the test db
        db.db.dropDatabase(function() {
            db.close();
            done();
        });
    });

    it('should create instance', function(done) {
        Instance.find({
                name: 'a'
            }).exec().then(function(instances) {
                var instance = instances.shift();
                //console.log( instance );
                instance.serviceType.should.be.eq('PCP');

                instance.stacks.push(stacks[1]._id);


                return instance.save();
            })
            .then(function(instance) {
                console.log(instance);
                return Stack.find({
                    _id: {
                        $in: instance.stacks
                    }
                }).exec();
            })
            .then(function(stacks) {
                console.log(stacks);
                done();
            })
    });

    it('should create instance', function(done) {
        Instance.find({
                name: 'a'
            }).exec().then(function(instances) {
                var instance = instances.shift();
                //console.log( instance );
                instance.serviceType.should.be.eq('PCP');

                instance.stacks.push(stacks[0]._id.toString());

                //utils.insertIfNotExists(instance.stacks, stacks[0]);


                return instance.save();
            })
            .then(function(instance) {
                console.log(instance);
                return Stack.find({
                    _id: {
                        $in: _.map(instance.stacks, function(stack) {
                            return stack.toString();
                        })
                    }
                }).exec();
            })
            .then(function(stacks) {
                console.log(stacks);
                done();
            })
    });


});