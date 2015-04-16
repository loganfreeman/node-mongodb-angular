var _ = require('lodash');

module.exports = {
	insertIfNotExists: function(sink, source) {

		_.each(source, function(obj) {
			var res = _.find(sink, function(ins) {
				return ins == obj; // compare ObjectId to String, automatic type conversion
			});

			if (typeof res == 'undefined') {
				sink.push(obj);
			}
		})
	},

	exists: function(arr, id) {
		var res = _.find(arr, function(obj) {
			return obj.toString() === id.toString();
		})

		return typeof res != 'undefined'
	}
}