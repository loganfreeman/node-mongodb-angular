var sw = require( 'swagger-node-express' );
var paramTypes = sw.paramTypes;
var url = require( 'url' );
var swe = sw.errors;

var models = require( '../mongoose/models' );

var _ = require( 'lodash' );

var swaggerMethods = require( '../swaggerMethodMap.js' );

var mongoUtil = require( '../mongoose/utils.js' );


var UserNotFoundError = require( '../exception' ).UserNotFoundError;

var db = mongoUtil.connect();

var Group = db.model( 'Group' );
var User = db.model( 'User' );





var listGroup = {
    spec: {
        path: '/devops/group',
        method: 'GET',
        notes: 'The method allows to get all groups',
        //summary: 'return items for the given criteria',
        //type: 'Category',
        nickname: 'listGroups',
        produces: ['application/json']
    },
    action: function(req, res) {
        Group.find().exec()
            .then( function(groups) {
                res.json( groups );

            } );

    }
};

var createGroup = {
    spec: {
        path: '/devops/group',
        method: 'PUT',
        notes: 'The method allows to create a group',
        //summary: 'return items for the given criteria',
        //type: 'Category',
        nickname: 'createGroup',
        consumes: [
            'application/x-www-form-urlencoded'
        ],
        produces: ['application/json'],
        parameters: [{
            'name': 'name',
            'in': 'formData',
            'description': 'group name should be unique',
            'required': true,
            'type': 'string',
            'paramType': 'form'
            },
            {
                'name': 'description',
                'in': 'formData',
                'description': 'group description',
                'type': 'string',
                'paramType': 'form'
        }],
    },
    action: function(req, res) {

        Promise.resolve()
            .then( function() {
                return Group.create( req.body );
            } )
            .then( function(group) {
                res.json( group );
            } )
            .catch( function(err) {
                res.status( 500 ).send( err );
            } );

    }
};


var login = {
    spec: {
        path: '/devops/login',
        method: 'POST',
        notes: 'The method allows to login with credentials',
        //summary: 'return items for the given criteria',
        //type: 'Category',
        nickname: 'login',
        consumes: [
            'application/x-www-form-urlencoded'
        ],
        produces: ['application/json'],
        responses: {

        },
        parameters: [{
            'name': 'username',
            'in': 'formData',
            'description': 'username',
            'required': true,
            'type': 'string',
            'paramType': 'form'
            },
            {
                'name': 'password',
                'in': 'formData',
                'description': 'password',
                'required': true,
                'type': 'string',
                'paramType': 'form'
        }],
    },
    action: function(req, res) {
        var User = db.model( 'User' );
        User.findOne( {
            username: req.body.username
        } ).exec()
            .then( function(user) {
                if (user && user.authenticate( req.body.password )) {
                    res.json( user );
                } else {
                    res.status( 400 ).send( UserNotFoundError( 'User not found' ) );
                }

            } );

    }
};


var register = {
    spec: {
        path: '/devops/register',
        method: 'PUT',
        notes: 'The method allows to register a new user',
        //summary: 'return items for the given criteria',
        //type: 'Category',
        nickname: 'register',
        consumes: [
            'application/x-www-form-urlencoded'
        ],
        produces: ['application/json'],
        responses: {

        },
        parameters: [{
            'name': 'username',
            'in': 'formData',
            'description': 'username',
            'required': true,
            'type': 'string',
            'paramType': 'form'
            },
            {
                'name': 'password',
                'in': 'formData',
                'description': 'password',
                'required': true,
                'type': 'string',
                'paramType': 'form'
            },
            {
                'name': 'firstname',
                'in': 'formData',
                'description': 'firstname',
                'type': 'string',
                'paramType': 'form'
            },
            {
                'name': 'lastname',
                'in': 'formData',
                'description': 'lastname',
                'type': 'string',
                'paramType': 'form'
            },
            {
                'name': 'email',
                'in': 'formData',
                'description': 'email',
                'required': true,
                'type': 'string',
                'paramType': 'form'
        }],
    },
    action: function(req, res) {
        var User = db.model( 'User' );

        Promise.resolve()
            .then( function() {
                return User.create( req.body );
            } )
            .then( function(user) {
                res.json( user );
            } )
            .catch( function(err) {
                res.status( 500 ).send( err );
            } );

    }
};

var methods = [login, register, listGroup, createGroup];

module.exports = function(swagger) {
    _.each( methods, function(method) {
        var operation = swaggerMethods[method.spec.method];
        swagger[operation]( method );
    } );
};