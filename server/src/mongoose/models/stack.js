var mongoose = require('mongoose'),
	Promise = mongoose.Promise,
	Schema = mongoose.Schema,
	relationship = require("mongoose-relationship");


var uniqueValidator = require('mongoose-unique-validator');

var StackSchema = new Schema({
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
	environment: {
		type: Schema.ObjectId,
		ref: "Environment",
		childPath: "stacks"
	},
	instances: [{
		type: Schema.ObjectId,
		ref: "Instance"
	}]
});

StackSchema.plugin(relationship, {
	relationshipPathName: 'environment'
});

mongoose.models("Stack", StackSchema)