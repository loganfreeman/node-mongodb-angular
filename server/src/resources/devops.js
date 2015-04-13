var sw = require( 'swagger-node-express' );
var paramTypes = sw.paramTypes;
var url = require( 'url' );
var swe = sw.errors;

// var models = require( '../mongoose/models' );

var _ = require( 'lodash' );

var Promise = require( 'bluebird' );

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

var readFile = Promise.promisify( require( 'fs' ).readFile );

var config = require( '../config/config.js' );


/*var getLog = {
    spec: {
        path: '/server/log',
        method: 'GET',
        notes: 'The method allows to get server log',
        //summary: 'return items for the given criteria',
        //type: 'Category',
        nickname: 'getLog',
        produces: ['text/html']
    },
    action: function(req, res) {
        readFile( config.server.log )
            .then( function(contents) {
                //res.send( contents );
                res.render( 'server-log', {
                    contents: contents
                } );
            } )
            .catch( function(e) {
                res.status( 500 ).send( e );
            } );
    }
};*/



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

var listUsers = {
    spec: {
        path: '/devops/users',
        method: 'GET',
        notes: 'The method allows to get all users',
        //summary: 'return items for the given criteria',
        //type: 'Category',
        nickname: 'listUsers',
        produces: ['application/json']
    },
    action: function(req, res) {
        User.find().exec()
            .then( function(users) {
                //res.json( users );
                Promise.all( users ).map( function(user) {
                    return new Promise( function(resolve, reject) {
                            Group.find( {
                                '_id': {
                                    $in: user.groups
                                }
                            }, function(err, groups) {
                                    if (err) {
                                        reject( err );
                                    } else {
                                        user = user.toJSON();
                                        user.groups = groups;
                                        resolve( user );
                                    }

                                } );
                        } );
                } )
                    .then( function(users) {
                        res.json( users );
                    } );

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
            }, {
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
            }, {
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
        parameters: [{
            'name': 'stackId',
            'description': 'stack ID',
            'required': true,
            'type': 'string',
            'paramType': 'path'
            }, {
            'name': 'instance',
            'in': 'formData',
            'description': 'instance ID',
            'type': 'string',
            'paramType': 'form',
            'required': true
        }]
    },
    action: function(req, res) {
        var stack = Stack.findById( req.params.stackId ).exec();
        var instance = Instance.findById( req.body.instance ).exec();
        Promise.all( [stack, instance] )
            .then( function(values) {
                var stack = values[0],
                    instance = values[1];
                stack.instances.push( instance );
                // make sure the groups and users array are unique
                stack.instances = _.uniq( stack.instances, function(id) {
                    return id.toString();
                } );

                return stack.save();
            } )
            .then( function(stack) {
                res.json( stack );
            } );
    }
};

var addDeployToInstance = {
    spec: {
        path: '/devops/instance/{instanceId}/deploy',
        method: 'POST',
        notes: 'The method allows to add a instance to a stack',
        nickname: 'addDeployToInstance',
        consumes: [
            'application/x-www-form-urlencoded'
        ],
        produces: ['application/json'],
        parameters: [{
            'name': 'instanceId',
            'description': 'instance ID',
            'required': true,
            'type': 'string',
            'paramType': 'path'
            }, {
            'name': 'deploy',
            'in': 'formData',
            'description': 'deploy ID',
            'type': 'string',
            'paramType': 'form',
            'required': true
        }]
    },
    action: function(req, res) {
        var instance = Instance.findById( req.params.instanceId ).exec();
        var deploy = Deploy.findById( req.body.deploy ).exec();
        Promise.all( [instance, deploy] )
            .then( function(values) {
                var instance = values[0],
                    deploy = values[1];
                instance.deploys.push( deploy );
                // make sure the groups and users array are unique
                instance.deploys = _.uniq( instance.deploys, function(id) {
                    return id.toString();
                } );

                return instance.save();
            } )
            .then( function(instance) {
                res.json( instance );
            } );
    }
};

var updateUser = {
    spec: {
        // description: 'The method allows to retrieve items according to the given parameters',
        path: '/devops/user/{userId}',
        method: 'POST',
        notes: 'This method allows to update or modify a user',
        //summary: 'return items for the given criteria',
        //type: 'Category',
        nickname: 'updateUser',
        consumes: ['application/json'],
        produces: ['application/json'],
        parameters: [{
            'name': 'userId',
            'description': 'user ID',
            'required': true,
            'type': 'string',
            'paramType': 'path'
            },
        paramTypes.body( 'body', '(object) Modified User Properties', 'UserModification' )],
    },
    action: function(req, res) {
        var promises = [];
        var user = User.findById( req.params.userId ).exec();
        var stacks = Promise.resolve( [] );
        var instances = Promise.resolve( [] );
        if (req.body.stacks) {
            stacks = Stack.find( {
                '_id': {
                    $in: req.body.stacks
                }
            } ).exec();
        }

        if (req.body.instances) {
            instances = Instance.find( {
                '_id': {
                    $in: req.body.instances
                }
            } ).exec();
        }


        Promise.all( [user, stacks, instances] )
            .then( function(values) {
                var user = values[0];
                var stacks = values[1];
                var instances = values[2];
                if (stacks) {
                    user.stacks = _.uniq( user.stacks.concat( stacks ), function(id) {
                        return id.toString();
                    } );
                }

                if (instances) {
                    user.instances = _.uniq( user.instances.concat( instances ), function(id) {
                        return id.toString();
                    } );
                }

                return user.save();
            } )
            .then( function(user) {
                res.json( user );
            } );

    }
};

var addInstanceToUser = {
    spec: {
        path: '/devops/user/{userId}/instance',
        method: 'POST',
        notes: 'The method allows to add a instance to a user',
        nickname: 'addInstanceToUser',
        consumes: [
            'application/x-www-form-urlencoded'
        ],
        produces: ['application/json'],
        parameters: [{
            'name': 'userId',
            'description': 'User ID',
            'required': true,
            'type': 'string',
            'paramType': 'path'
            }, {
            'name': 'instance',
            'in': 'formData',
            'description': 'instance ID',
            'type': 'string',
            'paramType': 'form',
            'required': true
        }]
    },
    action: function(req, res) {
        var user = User.findById( req.params.userId ).exec();
        var instance = Instance.findById( req.body.instance ).exec();
        Promise.all( [user, instance] )
            .then( function(values) {
                var user = values[0],
                    instance = values[1];
                user.instances.push( instance );
                user.instances = _.uniq( user.instances, function(id) {
                    return id.toString();
                } );
                return user.save();
            } )
            .then( function(user) {
                res.json( user );
            } );
    }
};

var addStackToUser = {
    spec: {
        path: '/devops/user/{userId}/stack',
        method: 'POST',
        notes: 'The method allows to add a stack to a user',
        nickname: 'addStackToUser',
        consumes: [
            'application/x-www-form-urlencoded'
        ],
        produces: ['application/json'],
        parameters: [{
            'name': 'userId',
            'description': 'User ID',
            'required': true,
            'type': 'string',
            'paramType': 'path'
            }, {
            'name': 'stack',
            'in': 'formData',
            'description': 'stack ID',
            'type': 'string',
            'paramType': 'form',
            'required': true
        }]
    },
    action: function(req, res) {
        var user = User.findById( req.params.userId ).exec();
        var stack = Stack.findById( req.body.instance ).exec();
        Promise.all( [user, stack] )
            .then( function(values) {
                var user = values[0],
                    stack = values[1];
                user.stacks.push( stack );
                user.stacks = _.uniq( user.stacks, function(id) {
                    return id.toString();
                } );
                return user.save();
            } )
            .then( function(user) {
                res.json( user );
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
            .then( function(instances) {
                //res.json(instances);
                Promise.all( instances ).map( function(instance) {
                    return new Promise( function(resolve, reject) {
                            Deploy.find( {
                                '_id': {
                                    $in: instance.deploys
                                }
                            }, function(err, deploys) {
                                    if (err) {
                                        reject( err );
                                    } else {
                                        instance = instance.toJSON();
                                        instance.deploys = deploys;
                                        resolve( instance );
                                    }

                                } );
                        } );
                } )
                    .then( function(instances) {
                        res.json( instances );
                    } );

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
            .then( function(instances) {
                //res.json(instances);
                Promise.all( instances ).map( function(instance) {
                    return new Promise( function(resolve, reject) {
                            Deploy.find( {
                                '_id': {
                                    $in: instance.deploys
                                }
                            }, function(err, deploys) {
                                    if (err) {
                                        reject( err );
                                    } else {
                                        instance = instance.toJSON();
                                        instance.deploys = deploys;
                                        resolve( instance );
                                    }

                                } );
                        } );
                } )
                    .then( function(instances) {
                        res.json( instances );
                    } );

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
            'description': 'instance name should be unique',
            'required': true,
            'type': 'string',
            'paramType': 'form'
            }, {
            'name': 'ip',
            'in': 'formData',
            'description': 'ip address of the instance',
            'required': true,
            'type': 'string',
            'paramType': 'form'
            }, {
            'name': 'stack',
            'in': 'formData',
            'description': 'stack ID',
            'required': true,
            'type': 'string',
            'paramType': 'form'
            }, {
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
        produces: ['application/json'],
        parameters: [{
            'name': 'instanceId',
            'in': 'path',
            'description': 'instance ID',
            'required': true,
            'type': 'string',
            'paramType': 'path'
        }]
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
        nickname: 'createDeploy',
        consumes: [
            'application/x-www-form-urlencoded'
        ],
        produces: ['application/json'],
        parameters: [{
            'name': 'deployDate',
            'in': 'formData',
            'description': 'deploy Date',
            'required': true,
            'type': 'date',
            'paramType': 'form'
            }, {
            'name': 'user',
            'in': 'formData',
            'description': 'user ID',
            'required': true,
            'type': 'string',
            'paramType': 'form'
            }, {
            'name': 'instance',
            'in': 'formData',
            'description': 'instance ID',
            'required': true,
            'type': 'string',
            'paramType': 'form'
            }, {
            'name': 'comments',
            'in': 'formData',
            'description': 'deploy comments',
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
        parameters: [{
            'name': 'groupName',
            'description': 'name of the group',
            'required': true,
            'type': 'string',
            'paramType': 'query'
            }, {
            'name': 'userName',
            'description': 'User Name',
            'required': true,
            'type': 'string',
            'paramType': 'query'
        }]
    },
    action: function(req, res) {
        console.log( req.query );
        var group = Group.findOne( {
            name: req.query.groupName
        } ).exec();
        var user = User.findOne( {
            username: req.query.userName
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
        parameters: [{
            'name': 'groupId',
            'description': 'ID of the group',
            'required': true,
            'type': 'string',
            'paramType': 'path'
            }, {
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

                //res.json(groups);
                Promise.all( groups ).map( function(group) {
                    return new Promise( function(resolve, reject) {
                            User.find( {
                                '_id': {
                                    $in: group.users
                                }
                            }, function(err, users) {
                                    if (err) {
                                        reject( err );
                                    } else {
                                        group = group.toJSON();
                                        group.users = users;
                                        resolve( group );
                                    }

                                } );
                        } );
                } )
                    .then( function(groups) {
                        res.json( groups );
                    } );

            } );

    }
};

var getUsersByGroupId = {
    spec: {
        path: '/devops/group/{groupId}/users',
        method: 'GET',
        notes: 'The method allows to get all users for the group',
        //summary: 'return items for the given criteria',
        //type: 'Category',
        nickname: 'getUsersByGroupId',
        produces: ['application/json'],
        parameters: [{
            'name': 'groupId',
            'in': 'path',
            'description': 'group ID',
            'required': true,
            'type': 'string',
            'paramType': 'path'
        }]
    },
    action: function(req, res) {
        Group.findById( req.params.groupId ).exec()
            .then( function(group) {
                return User.find( {
                    '_id': {
                        $in: group.users
                    }
                } ).exec();
            } )
            .then( function(users) {
                // res.json(users);
                Promise.all( users ).map( function(user) {
                    return new Promise( function(resolve, reject) {
                            Group.find( {
                                '_id': {
                                    $in: user.groups
                                }
                            }, function(err, groups) {
                                    if (err) {
                                        reject( err );
                                    } else {
                                        user = user.toJSON();
                                        user.groups = groups;
                                        resolve( user );
                                    }

                                } );
                        } );
                } )
                    .then( function(users) {
                        res.json( users );
                    } );
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
            }, {
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
            }, {
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
            }, {
            'name': 'password',
            'in': 'formData',
            'description': 'password',
            'required': true,
            'type': 'string',
            'paramType': 'form'
            }, {
            'name': 'firstname',
            'in': 'formData',
            'description': 'firstname',
            'type': 'string',
            'paramType': 'form'
            }, {
            'name': 'lastname',
            'in': 'formData',
            'description': 'lastname',
            'type': 'string',
            'paramType': 'form'
            }, {
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


var listStacks = {
    spec: {
        path: '/devops/stack',
        method: 'GET',
        notes: 'The method allows to get all stacks',
        //summary: 'return items for the given criteria',
        //type: 'Category',
        nickname: 'listStacks',
        produces: ['application/json']
    },
    action: function(req, res) {
        Stack.find().exec()
            .then( function(stacks) {

                //res.json(stacks);
                Promise.all( stacks ).map( function(stack) {
                    return new Promise( function(resolve, reject) {
                            Instance.find( {
                                '_id': {
                                    $in: stack.instances
                                }
                            }, function(err, instances) {
                                    if (err) {
                                        reject( err );
                                    } else {
                                        stack = stack.toJSON();
                                        stack.instances = instances;
                                        resolve( stack );
                                    }

                                } );
                        } );
                } )
                    .then( function(stacks) {
                        res.json( stacks );
                    } );

            } );

    }
};


var listDeploys = {
    spec: {
        path: '/devops/deploy',
        method: 'GET',
        notes: 'The method allows to get all deploys',
        //summary: 'return items for the given criteria',
        //type: 'Category',
        nickname: 'listDeploys',
        produces: ['application/json']
    },
    action: function(req, res) {
        Deploy.find().exec()
            .then( function(deploys) {

                //res.json(deploys);
                Promise.all( deploys ).
                    map( function(deploy) {
                        var instance = Instance.findById( deploy.instance ).exec();
                        var user = User.findById( deploy.user ).exec();

                        return Promise.all( [instance, user] ).then( function(values) {
                            deploy = deploy.toJSON();
                            deploy.instance = values[0];
                            deploy.user = values[1];
                            return deploy;
                        } );
                    } )
                    .then( function(deploys) {
                        res.json( deploys );
                    } );

            } );

    }
};

var methods = [listUsers, getUsersByGroupId, listGroup, createGroup, addUserToGroup, addUserToGroupByName, listEnvironments, createEnvironment,
    getStackByEnvironmentId, createStack, createInstance, listInstances, getInstanceByStackId, getDeployByInstance, createDeploy,
    listStacks, listDeploys, addInstanceToUser, addStackToUser, addInstanceToStack, addDeployToInstance, updateUser
];

module.exports = function(swagger) {
    _.each( methods, function(method) {
        var operation = swaggerMethods[method.spec.method];
        swagger[operation]( method );
    } );
};