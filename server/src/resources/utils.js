var _ = require('lodash');

module.exports = {
	insertIfNotExists: function(sink, source) {
		_.each(source, function(obj) {
			var res = _.find(sink, function(ins) {
				return ins._id === obj._id;
			});

			if (typeof res == 'undefined') {
				sink.push(ins);
			}
		})
	},

	matchById: function(ids, arr) {
		return _.map(ids, function(id) {
			return _.find(arr, function(instance) {
				return instance._id === id;
			})
		})
	},

	uniq: function(left, right) {
		return _.uniq(left.concat(right), function(inst) {
			return inst._id;
		});
	},

	remove: function(left, right) {
		return _.reject(left, function(ins) {
			return _.some(right, function(exc) {
				return exc._id === ins._id;
			});
		});
	},

	getIds: function(arr) {
		return _.map(arr, function(inst) {
			return inst._id;
		})
	}
}