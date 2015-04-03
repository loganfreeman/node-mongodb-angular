/**
 * Module dependencies.
 */

var _ = require('lodash');

var expect = require('chai').expect,
    should = require('chai').should();

var mongoose = require('mongoose');


require('../../src/mongoose/models');



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