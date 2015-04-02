var Promise = require( 'bluebird' );

var User = require( '../mongoose/models' ).User;

var UserNotFoundError = require( '../exception' ).UserNotFoundError;


module.exports = {
    getUser: function(criteria) {
        var options = {
            criteria: criteria
        };

        return new Promise( function(resolve, reject) {
                User.load( options, function(err, model) {
                    if (err) {
                        reject( err );
                    } else {
                        resolve( model );
                    }
                } );
            } );
    },

    createUser: function(data) {
        var user = new User( data );
        return new Promise( function(resolve, reject) {
                user.save( function(err, model) {
                    if (err) {
                        reject( err );
                    } else {
                        resolve( model );
                    }
                } );
            } );
    },

    updateUser: function(data) {},


    deleteUserByEmail: function(email) {
        var self = this;
        return new Promise( function(resolve, reject) {
                self.getUser( {
                    email: email
                } )
                    .then( function(user) {
                        if (!user)
                            throw UserNotFoundError();
                        user.remove( function(err) {
                            if (err) {
                                reject( err );
                            } else {
                                resolve();
                            }
                        } );

                    } );
            } );
    }
};