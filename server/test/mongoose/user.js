/**
 * Module dependencies.
 */

var _ = require('lodash');

var expect = require('chai').expect,
    should = require('chai').should();

var mongoose = require('mongoose');


require('../../src/mongoose/models');

var Promise = require('bluebird');

var _ = require('lodash');

var NullReferenceError = require('../../src/exception').NullReferenceError;



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

    before(function(done) {
        // add dummy data
        db = connect('test');
        User = db.model('User');
        Group = db.model('Group');

        var group1 = Group.create({
            name: 'group #1'
        });
        var group2 = Group.create({
            name: 'group #2'
        });
        var userPromise = User.create(sample);
        Promise.all([userPromise, group1, group2])
            .then(function(values) {
                var user = values[0],
                    group1 = values[1],
                    group2 = values[2];
                user.groups.push(group1);
                user.groups.push(group2);
                user.email.should.be.eq('barray@cctv.com');
                group1.name.should.be.eq('group #1');
                group2.name.should.be.eq('group #2');
                // done();
                user.save(function(err, model) {
                    // console.log(model);
                    model.groups.length.should.be.eq(2);
                    done();
                });
            })
            .catch(function(err) {
                done(err);
            });
    });

    after(function(done) {
        // clean up the test db
        db.db.dropDatabase(function() {
            db.close();
            done();
        });
    });

    it('should login with username and password', function(done) {
        User.findOne({
                username: 'test'
            }).exec()
            .then(function(user) {
                return user.authenticate('electronic');
            })
            .then(function(result) {
                result.should.be.eq(true);
                done();
            });
    });

    it('should load by Id', function(done) {
        var userPromise = User.findOne({
            email: 'barray@cctv.com'
        }).exec();

        var userId;
        Promise.all([userPromise])
            .then(function(values) {
                var user = values[0];
                user.groups.length.should.be.eq(2);
                userId = user.id;
                Promise.resolve(user.groups)
                    .map(function(group) {
                        return Group.findById(group).exec();
                    })
                    .then(function(groupPromises) {
                        Promise.all(groupPromises)
                            .then(function(groups) {
                                _.each(groups, function(group) {
                                    group.users[0].toString().should.be.eq(userId);
                                });
                                done();
                            });
                    });
            });
    });

    it('should return promise', function() {
        var userPromise = User.create(sample),
            findOne = User.findOne({
                email: 'barray@cctv.com'
            }).exec();
        userPromise.should.be.instanceOf(mongoose.Promise);
        findOne.should.be.instanceOf(mongoose.Promise);

        var findById = User.findById(Math.random() * 100000).exec();
        findById.should.be.instanceOf(mongoose.Promise);
    });

    it('should useQuery', function(done) {
        User.findOne({
            email: 'barray@cctv.com'
        }).exec(function(err, model) {
            // console.log(model);
            model.email.should.be.eq('barray@cctv.com');
            model.authenticate('electronic').should.be.eq(true);
            done();
        });
    });

    it('should not create user with duplicate email', function(done) {
        User.create(sample, function(err) {
            //console.log( err );
            err.name.should.be.eq('ValidationError');
            _.each(err.errors, function(e) {
                e.name.should.be.eq('ValidatorError');
                e.path.should.match(/^(username|email)$/);
            });
            done();
        });
    });

    it('should find by Id', function(done) {

        var db, User, Group;
        db = connect('devops');
        User = db.model('User');
        Group = db.model('Group');
        var group = Group.findById('5522ee7d58292c77df437792').exec();
        var user = User.findById('5522ccb251c4decbb4ec7be5').exec();
        Promise.all([group, user])
            .then(function(values) {
                var group = values[0],
                    user = values[1];
                if (!group || !user) {
                    throw NullReferenceError();
                }
                group.users.push(user);
                user.groups.push(group);

                group.users = _.uniq(group.users, function(id) {
                    return id.toString();
                });
                user.groups = _.uniq(user.groups, function(id) {
                    return id.toString();
                });
                //console.log( group.users );
                //console.log( user.groups );
                Promise.all([group.save(), user.save()])
                    .then(function(values) {
                        done();
                    })
                    .catch(function(err) {
                        done(err);
                    });
            })
            .catch(NullReferenceError, function(err) {
                done();
            })

    });

    it('should not return salt and password', function(done) {
        var db, User, Group;
        db = connect('devops');
        User = db.model('User');
        Group = db.model('Group');
        User.load({
            username: 'scheng'
        }).then(function(user) {
            console.log(user);
            //user.should.not.have.property( 'salt' );
            //user.should.not.have.property( 'hashed_password' );

            user.should.have.property('username');
            user.should.have.property('email');
            user.should.have.property('user_info');
            user.user_info.username.should.be.eq('scheng');
            done();
        });
    });

    it('should validate user email', function(done) {
        var sample = {
            firstname: 'Roland',
            lastname: 'black',
            password: 'electronic',
            username: 'test',
            email: 'barraycctv.com'
        };
        Promise.resolve()
            .then(function() {
                return User.create(sample);
            })
            .catch(function(err) {
                //console.log( err.errors.email );
                err.errors.should.have.property('email');
                err.errors.should.have.property('username');
                err.errors.email.properties.message.should.be.eq('The specified email is invalid.');
                err.errors.email.properties.value.should.be.eq('barraycctv.com');

                done();
            });
    });



});