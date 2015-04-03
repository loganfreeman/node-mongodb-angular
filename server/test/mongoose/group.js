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
    var db, User, Group;

    var sample = {
        firstname: 'Roland',
        lastname: 'black',
        password: 'electronic',
        username: 'test',
        email: 'barray@cctv.com'
    };

    var sample1 = {
        firstname: 'Roland',
        lastname: 'black',
        password: 'electronic',
        username: 'test1',
        email: 'barray1@cctv.com'
    };

    before(function(done) {
        // add dummy data
        db = connect('test');
        User = db.model('User');
        Group = db.model('Group');

        var group = Group.create({
            name: 'sample group'
        });

        var userPromise = User.create(sample);

        var userPromise1 = User.create(sample1);

        Promise.all([userPromise, userPromise1, group])
            .then(function(values) {
                var user = values[0],
                    user1 = values[1],
                    group = values[2];

                user.email.should.be.eq('barray@cctv.com');
                user1.email.should.be.eq('barray1@cctv.com');
                group.name.should.be.eq('sample group');

                group.users.push(user1);
                group.users.push(user);
                // done();
                group.save(function(err, model) {
                    if (err) throw err;
                    // console.log(model);
                    model.users.length.should.be.eq(2);
                    done();
                });
            })
            .catch(function(err) {
                done(err);
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
        var groupPromise = Group.findOne({
            name: 'sample group'
        }).exec();
        var groupId;
        groupPromise.then(function(group) {
            groupId = group.id;
            Promise.resolve(group.users)
                .map(function(userId) {
                    return User.findById(userId).exec();
                })
                .then(function(userPromises) {
                    Promise.all(userPromises)
                        .then(function(users) {
                            _.each(users, function(user) {
                                console.log(user);
                            })
                            done();
                        });
                })
        })
    });

});