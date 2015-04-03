var mongoose = require('mongoose'),
	Promise = mongoose.Promise,
	Schema = mongoose.Schema,
	relationship = require("mongoose-relationship");


var uniqueValidator = require('mongoose-unique-validator');

var EnvironmentSchema = new Schema({
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
	stacks: [{
		type: Schema.ObjectId,
		ref: "Stack"
	}]
});

mongoose.models("Environment", EnvironmentSchema)