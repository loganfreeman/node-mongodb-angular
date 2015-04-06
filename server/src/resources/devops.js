var sw = require( 'swagger-node-express' );
var paramTypes = sw.paramTypes;
var url = require( 'url' );
var swe = sw.errors;

var models = require( '../mongoose/models' );

var _ = require( 'lodash' );

var swaggerMethods = require( '../swaggerMethodMap.js' );

var mongoUtil = require( '../mongoose/utils.js' );


var UserNotFoundError = require( '../exception' ).UserNotFoundError;


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
        console.log( req.body );
        var db = mongoUtil.connect();
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

var methods = [login];

module.exports = function(swagger) {
    _.each( methods, function(method) {
        var operation = swaggerMethods[method.spec.method];
        swagger[operation]( method );
    } );
};