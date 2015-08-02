/**
 *
 *
 *
 * @author scheng
 * @module stackController
 */


var schema = require( '../jugglingdb/init.js' );

var Promise = require( 'bluebird' );

var _ = require( 'lodash' );

var exceptions = require( '../exception' );

var NullReferenceError = exceptions.NullReferenceError;
var ObjectNotFoundError = exceptions.ObjectNotFoundError;




module.exports = {

    getStackById: function(id) {
        return new Promise( function(resolve, reject) {
                schema['stack'].find( id, function(err, model) {
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
                schema['stack'].create( data, function(err, model) {
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
                self.getStackById( source.id )
                    .then( function(stack) {
                        if (!stack) {
                            throw NullReferenceError( 'Stack instance doesn\'t exist' );
                        }
                        return _.assign( stack, source );
                    } )
                    .then( function(stack) {
                        var options = {
                            validate: true,
                            throws: true
                        };
                        stack.save( options, function(err, model) {
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
                self.getStackById( id )
                    .then( function(deploy) {
                        if (!deploy) {
                            resolve();
                        } else {
                            deploy.destroy( function(err) {
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


    getStacks: function() {
        return new Promise( function(resolve, reject) {
                schema['stack'].all( function(err, models) {
                    if (err) {
                        reject( err );
                    } else {
                        Promise.resolve( models )
                            .map( function(model) {
                                return new Promise( function(resolve, reject) {
                                        model.instances( function(err, instances) {
                                            // model.$instances = instances;
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
                                    .then( function(stacks) {
                                        resolve( stacks );
                                    } );
                            } );
                    }
                } );
            } );
    },


    getStacksByEnv: function(envId) {
        var params = {};
        params.where = {
            environment_id: envId
        };
        return new Promise( function(resolve, reject) {
                schema['stack'].all( params, function(err, models) {
                    if (err) {
                        reject( err );
                    } else {
                        Promise.resolve( models )
                            .map( function(model) {
                                return new Promise( function(resolve, reject) {
                                        model.instances( function(err, instances) {
                                            // model.$instances = instances;
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
                                    .then( function(stacks) {
                                        resolve( stacks );
                                    } );
                            } );
                    }
                } );
            } );
    }

};