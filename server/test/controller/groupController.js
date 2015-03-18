var controller = require( '../../src/controller/groupController.js' );

var db = require( '../../src/jugglingdb/init.js' );

var _ = require( 'lodash' );

var expect = require( 'chai' ).expect,
    should = require( 'chai' ).should();


describe( 'groups', function() {

    it( 'should return group by id', function(done) {
        controller.getGroup( 2 )
            .then( function(group) {
                group.should.be.instanceof( db['groups'] );
                done();
            }, function(err) {
                    done( err );
                } );
    } );
    it( 'should return groups', function(done) {
        controller.getGroups()
            .then( function(groups) {
                groups.should.be.instanceof( Array );
                groups[0].should.be.instanceof( db['groups'] );
                done();
            }, function(err) {
                    done( err );
                } );
    } );


    it( 'should return groups by user id', function(done) {
        controller.getGroupsByUserId( 2 )
            .then( function(groups) {
                groups.should.be.instanceof( Array );
                var test = _.every( groups, function(group) {
                    return group instanceof db['user_group'];
                } );
                test.should.be.eq( true );
                done();
            }, function(err) {
                    done( err );
                } );
    } );

    it( 'should return groups by groups id array', function(done) {
        controller.getGroupList( [1, 2] )
            .then( function(groups) {
                groups.should.be.instanceof( Array );
                var test = _.every( groups, function(group) {
                    return group instanceof db['groups'];
                } );
                test.should.be.eq( true );
                done();
            }, function(err) {
                    done( err );
                } );
    } );


    it( 'should return groups by groups id array', function(done) {
        controller.getGroupList( [2] )
            .then( function(groups) {
                groups.should.be.instanceof( Array );

                groups.length.should.be.eq( 1 );

                groups[0].name.should.be.eq( 'stage' );
                var test = _.every( groups, function(group) {
                    return group instanceof db['groups'];
                } );
                test.should.be.eq( true );


                done();
            }, function(err) {
                    done( err );
                } );
    } );


} );