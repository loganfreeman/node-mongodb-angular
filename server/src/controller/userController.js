/**
 *
 * @author scheng 
 *
 * @module userController
 */

var db = require( '../jugglingdb/init.js' );

var Promise = require( 'bluebird' );

var bcrypt = require( 'bcrypt' );

var _ = require( 'lodash' );

var uuid = require( 'node-uuid' );

var groupController = require( './groupController.js' );

module.exports = {

    /**
     * getUserById description
     * @param  {integer}
     * @return {promise}
     */
    getUserById: function(id) {
        var self = this;


        return new Promise( function(resolve, reject) {
                db['users'].find( id, function(err, user) {
                    if (err) {
                        reject( err );
                    } else {
                        // resolve( user );
                        self.attachGroup( user )
                            .then( function(user) {
                                resolve( user );
                            } );
                    }
                } );
            } );


    },

    /**
     * attach groups to a user, return a promise that fulfill a user
     * @param  {user}
     * @return {promise}
     */
    attachGroup: function(user) {

        var promise = new Promise( function(resolve, reject) {
            groupController.getGroupsByUserId( user.id )
                .map( function(userGroup) {
                    return userGroup.group_id;
                } )
                .then( function(groupIdList) {
                    return _.uniq( groupIdList );
                } )
                .then( function(groupIdList) {
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

    /**
     * getUserByEmail description
     * @param  {string}
     * @return {promise}
     */
    getUserByEmail: function(email) {
        var self = this;
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
                            // resolve( users[0] );
                            self.attachGroup( users[0] )
                                .then( function(user) {
                                    resolve( user );
                                } );
                        } else {
                            reject( Error( 'Found too many users with the email: ' + email ) );
                        }
                    }
                } );
            } );
    },

    /**
     * getUsers description
     * @return {promise}
     */
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

    /**
     * login thr username & password, if login successfully, return user, otherwise reject Error
     * @param  {string}
     * @param  {string}
     * @return {promise}
     */
    login: function(username, password) {

        var self = this;
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
                            var user = matches[0];
                            // generate a non-persistant token, and attached it to the user
                            user.token = uuid.v1();
                            // retrieve groups for the user
                            self.attachGroup( user )
                                .then( function(user) {
                                    resolve( user );
                                } );
                        } else {
                            reject( Error( 'Couldn\'t find the matching user in database' ) );
                        }
                    }
                } );
            } );
    },

    /**
     * create description
     * @param  {json}
     * @return {promise}
     */
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

    /**
     * destroy description
     * @param  {user}
     * @return {promise}
     */
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

    /**
     * save description
     * @param  {user}
     * @return {promise}
     */
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

    /**
     * update description
     * @param  {user}
     * @param  {attrs}
     * @return {promise}
     */
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