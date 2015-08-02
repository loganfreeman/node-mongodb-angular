var db = require( '../jugglingdb/init.js' );

var Promise = require( 'bluebird' );

var _ = require( 'lodash' );

var exceptions = require( '../exception' );

var NullReferenceError = exceptions.NullReferenceError;
var ObjectNotFoundError = exceptions.ObjectNotFoundError;
var DuplicateKeyError = exceptions.DuplicateKeyError;


module.exports = {


    addUserToGroup: function(userid, groupid) {
        var userGroup = new db['user_group'];
        userGroup.user_id = userid;
        userGroup.group_id = groupid;
        return new Promise( function(resolve, reject) {
                db['user_group'].create( userGroup, function(err, model) {
                    if (err) {
                        reject( err );
                    } else {
                        resolve( model );
                    }
                } );
            } );
    },

    getGroup: function(id) {
        return new Promise( function(resolve, reject) {
                db['groups'].find( id, function(err, model) {
                    if (err) {
                        reject( err );
                    } else {
                        resolve( model );
                    }
                } );
            } );
    },
    getGroups: function() {


        return new Promise( function(resolve, reject) {
                db['groups'].all( function(err, models) {
                    if (err) {
                        reject( err );
                    } else {
                        resolve( models );
                    }
                } );
            } );
    },



    getGroupsByUserId: function(userid) {
        return new Promise( function(resolve, reject) {
                var params = {};
                params.where = {
                    user_id: userid
                };
                db['user_group'].all( params, function(err, groups) {
                    if (err) {
                        reject( err );
                    } else {
                        resolve( groups );
                    }
                } );
            } );
    },


    getUsers: function(group_id) {
        var self = this;
        return new Promise( function(resolve, reject) {
                var params = {};
                params.where = {
                    group_id: group_id
                };
                db['user_group'].all( params, function(err, groups) {
                    if (err) {
                        reject( err );
                    } else {
                        Promise.resolve( groups )
                            .map( function(group) {
                                return group.user_id;
                            } )
                            .then( function(userIdList) {
                                return _.uniq( userIdList );
                            } )
                            .then( function(userIdList) {
                                var params = {};
                                params.where = {
                                    id: userIdList
                                };
                                db['users'].all( params, function(err, users) {
                                    if (err) {
                                        reject( err );
                                    } else {
                                        resolve( users );
                                    }
                                } );
                            } );
                    }
                } );
            } );
    },


    getGroupList: function(ids) {
        return new Promise( function(resolve, reject) {
                db['groups'].all( function(err, models) {
                    if (err) {
                        reject( err );
                    } else {
                        resolve( _.filter( models, function(model) {
                            return _.includes( ids, model.id );
                        } ) );
                    }
                } );
            } );
    },


    getGroupById: function(id) {
        return new Promise( function(resolve, reject) {
                db['groups'].find( id, function(err, model) {
                    if (err) {
                        reject( err );
                    } else {
                        resolve( model );
                    }
                } );
            } );
    },


    create: function(data) {
        return new Promise( function(resolve, reject) {
                db['groups'].create( data, function(err, model) {
                    if (err) {
                        reject( err );
                    } else {
                        resolve( model );
                    }
                } );
            } );
    },

    save: function(source) {
        var self = this;
        return new Promise( function(resolve, reject) {
                self.getGroupById( source.id )
                    .then( function(group) {
                        if (!group) {
                            throw NullReferenceError( 'Group instance doesn\'t exist' );
                        }
                        return _.assign( group, source );
                    } )
                    .then( function(group) {
                        var options = {
                            validate: true,
                            throws: true
                        };
                        group.save( options, function(err, model) {
                            if (err) {
                                reject( err );
                            } else {
                                resolve( model );
                            }
                        } );
                    } )
                    .catch( function(e) {
                        reject( e );
                    } );
            } );
    },

    delete: function(id) {
        var self = this;
        return new Promise( function(resolve, reject) {
                self.getGroupById( id )
                    .then( function(group) {
                        if (!group) {
                            resolve();
                        } else {
                            group.destroy( function(err) {
                                if (err) {
                                    reject( err );
                                } else {
                                    resolve();
                                }
                            } );
                        }

                    } );
            } );
    },
};