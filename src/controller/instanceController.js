/**
 *
 *
 *
 * @author scheng
 * @module instanceController
 */


var schema = require( '../jugglingdb/init.js' );

var Promise = require( 'bluebird' );

var _ = require( 'lodash' );

var where = require( '../utils.js' ).where;




module.exports = {

    getInstanceById: function(id) {
        return new Promise( function(resolve, reject) {
                schema['instance'].find( id, function(err, model) {
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
                schema['instance'].create( data, function(err, model) {
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
                self.getInstanceById( source.id )
                    .then( function(instance) {
                        if (!instance) {
                            throw NullReferenceError( 'Instance instance doesn\'t exist' );
                        }
                        return _.assign( instance, source );
                    } )
                    .then( function(instance) {
                        var options = {
                            validate: true,
                            throws: true
                        };
                        instance.save( options, function(err, model) {
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
                self.getInstanceById( id )
                    .then( function(instance) {
                        if (!instance) {
                            resolve();
                        } else {
                            instance.destroy( function(err) {
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


    getInstances: function() {
        return new Promise( function(resolve, reject) {
                schema['instance'].all( function(err, models) {
                    if (err) {
                        reject( err );
                    } else {
                        Promise.resolve( models )
                            .map( function(model) {
                                return new Promise( function(resolve, reject) {
                                        model.deploys( function(err, deploys) {
                                            if (err) {
                                                reject( err );
                                            } else {
                                                resolve( model );
                                            }
                                        } );
                                    } );
                            } )
                            .then( function(promises) {
                                Promise.all( promises )
                                    .then( function(instances) {
                                        resolve( instances );
                                    } );
                            } );
                    }
                } );
            } );
    },


    getInstancesByStack: function(stackId) {
        return new Promise( function(resolve, reject) {

                schema['instance'].all( where( 'stack_id', stackId ), function(err, models) {
                    if (err) {
                        reject( err );
                    } else {
                        resolve( models );
                    }
                } );
            } );
    }



};