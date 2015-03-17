var bcrypt = require( 'bcrypt' );


var expect = require( 'chai' ).expect,
    should = require( 'chai' ).should();


var _ = require( 'lodash' );



describe( 'bcrypt', function() {
    var salt = bcrypt.genSaltSync( 10 );
    salt.length.should.be.eq( 29 );
    var hash = bcrypt.hashSync( 'test', salt );
    bcrypt.compareSync( 'test', hash ).should.equal( true );


    hash = bcrypt.hashSync( 'password', salt );
    bcrypt.compareSync( 'password', hash ).should.equal( true );


    hash = bcrypt.hashSync( 'hell$66', salt );
    bcrypt.compareSync( 'hell$66', hash ).should.equal( true );


    hash = bcrypt.hashSync( '@33yyy', salt );
    bcrypt.compareSync( '@33yyy', hash ).should.equal( true );

    describe( 'users', function() {
        it( 'should find user by password', function() {
            var users = [{
                name: 'scheng',
                password: '$2a$10$eczSQhaHISNuoKsH080P4.AS7Y/jTRJfB2k/EdVdNF1jFgCM.HFRy'
                }, {
                name: 'scheng',
                password: '$2a$10$eczSQhaHISNuoKsH080P4.gbo1V14pgqrSkIs8pupz8u28eNa0JBq'
                }, {
                name: 'scheng',
                password: '$2a$10$eczSQhaHISNuoKsH080P4.WuFMpbL9CeBaBBR.5bsbZWdc4N6Qpzu'
                }, {
                name: 'scheng',
                password: '$2a$10$eczSQhaHISNuoKsH080P4.SJe0VoY1ucybcSiW/Ny.2FPD2zHfYyO'
                },
                {
                    name: 'peter',
                    password: 'abbc'
            }];


            var user = _.filter( users, function(user) {
                return user.name === 'peter';
            } );

            user.should.be.instanceof( Array );
            user.length.should.be.eq( 1 );


            user = _.filter( users, function(user) {
                return bcrypt.compareSync( '@33yyy', user.password );
            } );

            user.should.be.instanceof( Array );
            user.length.should.be.eq( 1 );

            user[0].password.should.be.eq( '$2a$10$eczSQhaHISNuoKsH080P4.SJe0VoY1ucybcSiW/Ny.2FPD2zHfYyO' );
        } );


    } );

} );