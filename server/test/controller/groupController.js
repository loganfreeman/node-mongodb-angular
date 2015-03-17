var controller = require( '../../src/controller/groupController.js' );

var db = require( '../../src/jugglingdb/init.js' );

var _ = require( 'lodash' );

var expect = require( 'chai' ).expect,
    should = require( 'chai' ).should();


describe( 'groups', function() {
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
} );