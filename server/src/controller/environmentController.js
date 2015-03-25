var schema = require('../jugglingdb/init.js');

var Promise = require('bluebird');

var _ = require('lodash');


module.exports = {


    getEnvironments: function() {
        return new Promise(function(resolve, reject) {
            schema['environment'].all(function(err, models) {
                if (err) {
                    reject(err);
                } else {
                    Promise.resolve(models)
                        .map(function(env) {
                            return new Promise(function(resolve, reject) {
                                env.stacks(function(err, stacks) {
                                    if (err) {
                                        reject(err);
                                    } else {
                                        env.$stacks = stacks;
                                        resolve(env);
                                    }
                                })
                            })
                        })
                        .then(function(promises) {
                            Promise.all(promises)
                                .then(function(envs) {
                                    resolve(envs);
                                })
                        })
                }
            });
        });
    },


    create: function(instance) {
        return new Promise(function(resolve, reject) {
            schema['environment'].create(instance, function(err, model) {
                if (err) {
                    reject(err);
                } else {
                    model.stacks(function(err, stacks) {
                        resolve(model);
                    })
                }
            });
        });
    },

    getEnvironmentById: function(id) {
        return new Promise(function(resolve, reject) {
            schema['environment'].find(id, function(err, model) {
                if (err) {
                    reject(err);
                } else {
                    // resolve(model);
                    model.stacks(function(err, stacks) {
                        if (err) {
                            reject(err);
                        } else {
                            model.$stacks = stacks;
                            resolve(model);
                        }

                    })
                }
            });
        });
    },

    delete: function(id) {
        var self = this;
        return new Promise(function(resolve, reject) {
            self.getEnvironmentById(id)
                .then(function(env) {
                    //console.log('about to destroy ' + JSON.stringify(env));
                    env.destroy(function(err, model) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(model);
                        }
                    })
                })
        })
    }

};