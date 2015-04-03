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

    before(function(done) {
        // add dummy data
        db = connect('test');
        User = db.model('User');
        Group = db.model('Group');
        var pending = 3;

        User.create(sample, added);

        Group.create({
            name: 'group1'
        }, added);

        Group.create({
            name: 'group2'
        }, added);


        function added(err) {
            if (err) {
                console.log(err);
            }
            if (added.err) return;

            if (err) {
                db.close();
                return done(added.err = err);
            }

            if (--pending) return;
            done();
        }
    });

    after(function(done) {
        // clean up the test db
        db.db.dropDatabase(function() {
            db.close();
            done();
        });
    });

    it('should return promise', function() {
        var userPromise = User.create(sample),
            findOne = User.findOne({
                email: 'barray@cctv.com'
            }).exec();
        userPromise.should.be.instanceOf(mongoose.Promise);
        findOne.should.be.instanceOf(mongoose.Promise);
    });

    it('should create all groups', function(done) {
        var group1 = Group.create({
            name: 'group #1'
        });
        var group2 = Group.create({
            name: 'group #2'
        });
        var userPromise = User.findOne({
            email: 'barray@cctv.com'
        }).exec();
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
                done();
            })
            .catch(function(err) {
                done(err);
            })
    })


    it('should useQuery', function(done) {
        User.findOne({
            email: 'barray@cctv.com'
        }).exec(function(err, model) {
            console.log(model);
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



});