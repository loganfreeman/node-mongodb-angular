var _ = require('lodash');

var Promise = require('bluebird');

module.exports = {
    insertIfNotExists: function(sink, source) {

        _.each(source, function(obj) {
            var res = _.find(sink, function(ins) {
                return ins == obj; // compare ObjectId to String, automatic type conversion
            });

            if (typeof res == 'undefined') {
                sink.push(obj);
            }
        });
    },

    exists: function(arr, id) {
        var res = _.find(arr, function(obj) {
            return obj.toString() === id.toString();
        });

        return typeof res != 'undefined';
    },

    safeToString: function(obj) {
        if (obj == null) return 'null';
        if (typeof obj == 'undefined') return 'undefined';
        return obj.toString();
    }


};