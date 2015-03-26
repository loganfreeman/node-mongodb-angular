var schema = require('../jugglingdb/init.js');

var Promise = require('bluebird');

var _ = require('lodash');


module.exports = {


    getDeploys: function() {
        return new Promise(function(resolve, reject) {
            schema['deploy'].all(function(err, models) {
                if (err) {
                    reject(err);
                } else {
                    resolve(models);
                }
            });
        });
    },

    /**
     * get deploys for an instance
     * @param  {Number}
     * @return {JSONArray}
     */
    getDeployByInstance: function(instance) {
        var params = {};
        params.where = {
            instance_id: instance
        };
        return new Promise(function(resolve, reject) {
            schema['deploy'].all(params, function(err, models) {
                if (err) {
                    reject(err);
                } else {
                    resolve(models);
                }
            });
        });
    },


    getDeployById: function(id) {
        return new Promise(function(resolve, reject) {
            schema['deploy'].find(id, function(err, model) {
                if (err) {
                    reject(err);
                } else {
                    resolve(model);
                }
            })
        })
    },

    /**
     * create a new deploy
     * @param  {json}
     * @return {Promise}
     */
    create: function(data) {

        return new Promise(function(resolve, reject) {
            schema['deploy'].create(data, function(err, model) {
                if (err) {
                    reject(err);
                } else {
                    resolve(model);
                }
            });
        });
    },

    delete: function(id) {
        var self = this;
        return new Promise(function(resolve, reject) {
            self.getDeployById(id)
                .then(function(deploy) {
                    deploy.destroy(function(err) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve();
                        }
                    });
                })
        })
    }

};