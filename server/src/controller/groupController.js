var db = require( '../jugglingdb/init.js' );

var Promise = require( 'bluebird' );

var _ = require( 'lodash' );


module.exports = {
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


    create: function(group) {}
};