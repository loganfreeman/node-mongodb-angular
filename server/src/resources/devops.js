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
var Environment = db.model( 'Environment' );
var Stack = db.model( 'Stack' );
var Instance = db.model( 'Instance' );
var Deploy = db.model( 'Deploy' );



var listEnvironments = {
    spec: {
        path: '/devops/environment',
        method: 'GET',
        notes: 'The method allows to get all environments',
        //summary: 'return items for the given criteria',
        //type: 'Category',
        nickname: 'listEnvironments',
        produces: ['application/json']
    },
    action: function(req, res) {
        Environment.find().exec()
            .then( function(models) {
                res.json( models );

            } );

    }
};


var createEnvironment = {
    spec: {
        path: '/devops/environment',
        method: 'PUT',
        notes: 'The method allows to create a environment',
        //summary: 'return items for the given criteria',
        //type: 'Category',
        nickname: 'createEnvironment',
        consumes: [
            'application/x-www-form-urlencoded'
        ],
        produces: ['application/json'],
        parameters: [{
            'name': 'name',
            'in': 'formData',
            'description': 'environment name should be unique',
            'required': true,
            'type': 'string',
            'paramType': 'form'
            },
            {
                'name': 'description',
                'in': 'formData',
                'description': 'environment description',
                'type': 'string',
                'paramType': 'form'
        }],
    },
    action: function(req, res) {

        Promise.resolve()
            .then( function() {
                return Environment.create( req.body );
            } )
            .then( function(environment) {
                res.json( environment );
            } )
            .catch( function(err) {
                res.status( 500 ).send( err );
            } );

    }
};



var getStackByEnvironmentId = {
    spec: {
        path: '/devops/environment/{environmentId}/stack',
        method: 'GET',
        notes: 'The method allows to get all stacks belonging to an environment',
        //summary: 'return items for the given criteria',
        //type: 'Category',
        nickname: 'getStackByEnvironmentId',
        parameters: [{
            'name': 'environmentId',
            'in': 'path',
            'description': 'environment ID',
            'required': true,
            'type': 'string',
            'paramType': 'path'
        }],
        produces: ['application/json']
    },
    action: function(req, res) {
        Stack.find( {
            environment: req.params.environmentId
        } ).exec()
            .then( function(models) {
                res.json( models );

            } );

    }
};

var createStack = {
    spec: {
        path: '/devops/stack',
        method: 'PUT',
        notes: 'The method allows to create a stack',
        //summary: 'return items for the given criteria',
        //type: 'Category',
        nickname: 'createStack',
        consumes: [
            'application/x-www-form-urlencoded'
        ],
        produces: ['application/json'],
        parameters: [{
            'name': 'name',
            'in': 'formData',
            'description': 'stack name should be unique',
            'required': true,
            'type': 'string',
            'paramType': 'form'
            },
            {
                'name': 'description',
                'in': 'formData',
                'description': 'stack description',
                'type': 'string',
                'paramType': 'form'
            }, {
            'name': 'environment',
            'in': 'formData',
            'description': 'environment ID',
            'type': 'string',
            'paramType': 'form'
        }],
    },
    action: function(req, res) {

        Promise.resolve()
            .then( function() {
                return Stack.create( req.body );
            } )
            .then( function(group) {
                res.json( group );
            } )
            .catch( function(err) {
                res.status( 500 ).send( err );
            } );

    }
};

var addInstanceToStack = {
    spec: {
        path: '/devops/stack/{stackId}/instance',
        method: 'POST',
        notes: 'The method allows to add a instance to a stack',
        nickname: 'addInstanceToStack',
        consumes: [
            'application/x-www-form-urlencoded'
        ],
        produces: ['application/json'],
        parameters: [
            {
                'name': 'stackId',
                'description': 'stack ID',
                'required': true,
                'type': 'string',
                'paramType': 'path'
            },
            {
                'name': 'userName',
                'description': 'User Name',
                'required': true,
                'type': 'string',
                'paramType': 'query'
        }]
    },
    action: function(req, res) {
        var group = Group.findOne( req.params.groupName ).exec();
        var user = User.findOne( req.body.userName ).exec();
        Promise.all( [group, user] )
            .then( function(values) {
                var group = values[0],
                    user = values[1];
                group.users.push( user );
                user.groups.push( group );
                // make sure the groups and users array are unique
                group.users = _.uniq( group.users, function(id) {
                    return id.toString();
                } );
                user.groups = _.uniq( user.groups, function(id) {
                    return id.toString();
                } );


                Promise.all( [group.save(), user.save()] )
                    .then( function(values) {
                        console.log( values );
                        res.json( values[0] );
                    } )
                    .catch( function(err) {
                        res.status( 500 ).send( err );
                    } );
            } );
    }
};

var getInstanceByStackId = {
    spec: {
        path: '/devops/stack/{stackId}/instannce',
        method: 'GET',
        notes: 'The method allows to get all instances belonging to a stack',
        //summary: 'return items for the given criteria',
        //type: 'Category',
        nickname: 'getInstanceByStackId',
        produces: ['application/json'],
        parameters: [{
            'name': 'stackId',
            'description': 'stack ID',
            'required': true,
            'type': 'string',
            'paramType': 'path'
        }]
    },
    action: function(req, res) {
        Instance.find( {
            stack: req.params.stackId
        } ).exec()
            .then( function(groups) {
                res.json( groups );

            } );

    }
};

var listInstances = {
    spec: {
        path: '/devops/instance',
        method: 'GET',
        notes: 'The method allows to get all instances',
        //summary: 'return items for the given criteria',
        //type: 'Category',
        nickname: 'listInstances',
        produces: ['application/json']
    },
    action: function(req, res) {
        Instance.find().exec()
            .then( function(groups) {
                res.json( groups );

            } );

    }
};

var createInstance = {
    spec: {
        path: '/devops/instance',
        method: 'PUT',
        notes: 'The method allows to create a instance',
        //summary: 'return items for the given criteria',
        //type: 'Category',
        nickname: 'createInstance',
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
                return Instance.create( req.body );
            } )
            .then( function(group) {
                res.json( group );
            } )
            .catch( function(err) {
                res.status( 500 ).send( err );
            } );

    }
};

var getDeployByInstance = {
    spec: {
        path: '/devops/instance/{instanceId}/deploy',
        method: 'GET',
        notes: 'The method allows to get all deploys belonging to an instnace',
        //summary: 'return items for the given criteria',
        //type: 'Category',
        nickname: 'getDeployByInstance',
        produces: ['application/json']
    },
    action: function(req, res) {
        Deploy.find( {
            instance: req.params.instanceId
        } ).exec()
            .then( function(groups) {
                res.json( groups );

            } );

    }
};

var createDeploy = {
    spec: {
        path: '/devops/deploy',
        method: 'PUT',
        notes: 'The method allows to create a deploy',
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
                return Deploy.create( req.body );
            } )
            .then( function(group) {
                res.json( group );
            } )
            .catch( function(err) {
                res.status( 500 ).send( err );
            } );

    }
};


var addUserToGroupByName = {
    spec: {
        path: '/devops/group/user',
        method: 'POST',
        notes: 'The method allows to add a user to a group',
        nickname: 'addUserToGroupByName',
        consumes: [
            'application/x-www-form-urlencoded'
        ],
        produces: ['application/json'],
        parameters: [
            {
                'name': 'groupName',
                'description': 'name of the group',
                'required': true,
                'type': 'string',
                'paramType': 'query'
            },
            {
                'name': 'userName',
                'description': 'User Name',
                'required': true,
                'type': 'string',
                'paramType': 'query'
        }]
    },
    action: function(req, res) {
        var group = Group.findOne( {
            name: req.params.groupName
        } ).exec();
        var user = User.findOne( {
            username: req.params.userName
        } ).exec();
        Promise.all( [group, user] )
            .then( function(values) {
                var group = values[0],
                    user = values[1];
                group.users.push( user );
                user.groups.push( group );
                // make sure the groups and users array are unique
                group.users = _.uniq( group.users, function(id) {
                    return id.toString();
                } );
                user.groups = _.uniq( user.groups, function(id) {
                    return id.toString();
                } );


                Promise.all( [group.save(), user.save()] )
                    .then( function(values) {
                        console.log( values );
                        res.json( values[0] );
                    } )
                    .catch( function(err) {
                        res.status( 500 ).send( err );
                    } );
            } );
    }
};


var addUserToGroup = {
    spec: {
        path: '/devops/group/{groupId}/user',
        method: 'POST',
        notes: 'The method allows to add a user to a group',
        nickname: 'addUserToGroup',
        consumes: [
            'application/x-www-form-urlencoded'
        ],
        produces: ['application/json'],
        parameters: [
            {
                'name': 'groupId',
                'description': 'ID of the group',
                'required': true,
                'type': 'string',
                'paramType': 'path'
            },
            {
                'name': 'userId',
                'in': 'formData',
                'description': 'User ID',
                'required': true,
                'type': 'string',
                'paramType': 'form'
        }]
    },
    action: function(req, res) {
        //console.log( req.params );
        //console.log( req.body );
        var group = Group.findById( req.params.groupId ).exec();
        var user = User.findById( req.body.userId ).exec();
        Promise.all( [group, user] )
            .then( function(values) {
                var group = values[0],
                    user = values[1];
                group.users.push( user );
                user.groups.push( group );
                // make sure the groups and users array are unique
                group.users = _.uniq( group.users, function(id) {
                    return id.toString();
                } );
                user.groups = _.uniq( user.groups, function(id) {
                    return id.toString();
                } );


                Promise.all( [group.save(), user.save()] )
                    .then( function(values) {
                        console.log( values );
                        res.json( values[0] );
                    } )
                    .catch( function(err) {
                        res.status( 500 ).send( err );
                    } );
            } );
    }
};


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

var methods = [login, register, listGroup, createGroup, addUserToGroup, addUserToGroupByName, listEnvironments, createEnvironment,
getStackByEnvironmentId, createStack];

module.exports = function(swagger) {
    _.each( methods, function(method) {
        var operation = swaggerMethods[method.spec.method];
        swagger[operation]( method );
    } );
};