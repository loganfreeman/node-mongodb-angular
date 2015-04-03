var mongoose = require('mongoose'),
	Promise = mongoose.Promise,
	Schema = mongoose.Schema,
	relationship = require("mongoose-relationship");


var uniqueValidator = require('mongoose-unique-validator');

var GroupSchema = new Schema({

	name: {
		type: String,
		default: '',
		required: true,
		unique: true
	},
	description: {
		type: String,
		default: ''
	},
	users: [{
		type: Schema.ObjectId,
		ref: "User",
		childPath: "groups"
	}]
});


GroupSchema.plugin(uniqueValidator);

GroupSchema.plugin(relationship, {
	relationshipPathName: 'users'
});

mongoose.model('Group', GroupSchema);