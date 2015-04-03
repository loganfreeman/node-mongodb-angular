var mongoose = require('mongoose'),
	Promise = mongoose.Promise,
	Schema = mongoose.Schema,
	relationship = require("mongoose-relationship");


var uniqueValidator = require('mongoose-unique-validator');

var DeploySchema = new Schema({
	deployDate: {
		type: Date,
		default: '',
		required: true,
		unique: true
	},
	comments: {
		type: String,
		default: ''
	},
	user: {
		type: Schema.ObjectId,
		ref: "User"
	},
	instance: {
		type: Schema.ObjectId,
		ref: "Instance",
		childPath: "deploys"
	},
});

DeploySchema.plugin(relationship, {
	relationshipPathName: 'instance'
});

mongoose.model("Deploy", DeploySchema);