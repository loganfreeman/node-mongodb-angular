var db = require( '../jugglingdb/init.js' );

var Promise = require( 'bluebird' );

var bcrypt = require( 'bcrypt' );

var _ = require( 'lodash' );


var groupController = require( './groupController.js' );

module.exports = {
    getUserById: function(id) {


        var userPromise = new Promise( function(resolve, reject) {
            db['users'].find( id, function(err, user) {
                if (err) {
                    reject( err );
                } else {
                    resolve( user );
                }
            } );
        } );

        var self = this;

        return new Promise( function(resolve, reject) {
                userPromise.then( function(user) {
                    self.attachGroup( user )
                        .then( function(user) {
                            resolve( user );
                        } );
                } );
            } );


    },


    attachGroup: function(user) {

        var promise = new Promise( function(resolve, reject) {
            groupController.getGroupsByUserId( user.id )
                .map( function(userGroup) {
                    return userGroup.group_id;
                } ).then( function(groupIdList) {
                return groupController.getGroupList( groupIdList );
            } ).then( function(groups) {
                user.groups = groups;
                resolve( user );
            } ).catch( function(e) {
                reject( e );
            } );
        } );

        return promise;
    },

    getUserByEmail: function(email) {
        return new Promise( function(resolve, reject) {
                var params = {};
                params.where = {
                    email: email
                };
                db['users'].all( params, function(err, users) {
                    if (err) {
                        reject( err );
                    } else {
                        if (users.length == 1) {
                            resolve( users[0] );
                        } else {
                            reject( Error( 'Found too many users with the email: ' + email ) );
                        }
                    }
                } );
            } );
    },


    getUsers: function() {
        var self = this;
        return new Promise( function(resolve, reject) {
                db['users'].all( function(err, users) {
                    if (err) {
                        reject( err );
                    } else {
                        Promise.resolve( users )
                            .map( function(user) {
                                return self.attachGroup( user );
                            } )
                            .then( function(promises) {
                                Promise.all( promises )
                                    .then( function(users) {
                                        resolve( users );
                                    } );
                            } );
                    }
                } );
            } );



    },


    login: function(username, password) {
        return new Promise( function(resolve, reject) {
                var params = {};
                params.where = {
                    name: username
                };
                db['users'].all( params, function(err, users) {
                    if (err) {
                        reject( err );
                    } else {
                        var matches = _.filter( users, function(user) {
                            return bcrypt.compareSync( password, user.password );
                        } );

                        if (matches.length == 1) {
                            resolve( matches[0] );
                        } else {
                            reject( Error( 'Couldn\'t find the matching user in database' ) );
                        }
                    }
                } );
            } );
    },


    create: function(user) {
        var salt = bcrypt.genSaltSync( 10 );
        var hash = bcrypt.hashSync( user.password, salt );
        user.password = hash;
        return new Promise( function(resolve, reject) {
                db['users'].create( user, function(err, model) {
                    if (err) {
                        reject( err );
                    } else {
                        resolve( model );
                    }
                } );
            } );
    },


    destroy: function(user) {
        return new Promise( function(resolve, reject) {
                user.destroy( function(err, model) {
                    if (err) {
                        reject( err );
                    } else {
                        resolve( model );
                    }
                } );
            } );
    },

    save: function(user) {
        return new Promise( function(resolve, reject) {
                var options = {
                    validate: true,
                    throws: true
                };
                user.save( options, function(err, model) {
                    if (err) {
                        reject( err );
                    } else {
                        resolve( model );
                    }
                } );
            } );
    },

    update: function(user, attrs) {
        return new Promise( function(resolve, reject) {

                user.updateAttributes( attrs, function(err, model) {
                    if (err) {
                        reject( err );
                    } else {
                        resolve( model );
                    }
                } );
            } );
    }
};