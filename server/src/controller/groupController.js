var db = require( '../jugglingdb/init.js' );

var Promise = require( 'bluebird' );

var _ = require( 'lodash' );


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


    create: function(group) {
        return new Promise( function(resolve, reject) {
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
            } );
    }
};