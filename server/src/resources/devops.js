var sw = require( 'swagger-node-express' );
var paramTypes = sw.paramTypes;
var url = require( 'url' );
var swe = sw.errors;

// var models = require( '../mongoose/models' );

var _ = require( 'lodash' );

var Promise = require( 'bluebird' );

var swaggerMethods = require( '../swaggerMethodMap.js' );

var mongoUtil = require( '../mongoose/utils.js' );

var exceptions = require( '../exception' );
var UserNotFoundError = exceptions.UserNotFoundError;

var ObjectNotFoundError = exceptions.ObjectNotFoundError;

var db = mongoUtil.connect();

var Group = db.model( 'Group' );
var User = db.model( 'User' );
var Environment = db.model( 'Environment' );
var Stack = db.model( 'Stack' );
var Instance = db.model( 'Instance' );
var Deploy = db.model( 'Deploy' );

var readFile = Promise.promisify( require( 'fs' ).readFile );

var config = require( '../config/config.js' );

var utils = require( './utils.js' );

var mongoose = require( 'mongoose' );

var ObjectId = mongoose.Schema.Types.ObjectId;


var resolveDeploy = function(deploy) {
    var instance = Instance.findById( deploy.instance ).exec();
    var user = User.findById( deploy.user ).exec();

    return Promise.all( [instance, user] ).then( function(values) {
        deploy = deploy.toJSON();
        deploy.instance = values[0];
        deploy.user = values[1];
        return deploy;
    } );
};


var resolveUser = function(user) {
    return new Promise( function(resolve, reject) {

            var groups = Promise.resolve( [] ),
                stacks = Promise.resolve( [] ),
                instances = Promise.resolve( [] );
            if (user.groups) {
                groups = Group.find( {
                    '_id': {
                        $in: user.groups
                    }
                } ).exec();
            }

            if (user.stacks) {
                stacks = Stack.find( {
                    '_id': {
                        $in: user.stacks
                    }
                } ).exec();
            }

            if (user.instances) {
                instances = Instance.find( {
                    '_id': {
                        $in: user.instances
                    }
                } ).exec();
            }

            var userPromise = Promise.resolve( user );

            Promise.all( [groups, stacks, instances, userPromise] )
                .then( function(values) {
                    var groups = values[0];
                    var stacks = values[1];
                    var instances = values[2];
                    var user = values[3].toJSON();
                    user.groups = groups;
                    user.stacks = stacks;
                    user.instances = instances;
                    return user;
                } )
                .then( function(user) {
                    resolve( user );
                } );


        } );
};



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

var deleteEnvironment = {
    spec: {
        path: '/devops/environment/{id}',
        method: 'DELETE',
        notes: 'The method allows to delete an environments',
        //summary: 'return items for the given criteria',
        //type: 'Category',
        nickname: 'deleteEnvironment',
        produces: ['application/json'],
        parameters: [{
            'name': 'id',
            'in': 'path',
            'description': 'environment ID',
            'required': true,
            'type': 'string',
            'paramType': 'path'
        }]
    },
    action: function(req, res) {
        Environment.find( {
            _id: req.params.id
        } ).remove().exec()
            .then( function(models) {
                res.json( models );

            } );

    }
};


var deleteGroup = {
    spec: {
        path: '/devops/group/{id}',
        method: 'DELETE',
        notes: 'The method allows to delete an group',
        //summary: 'return items for the given criteria',
        //type: 'Category',
        nickname: 'deleteGroup',
        produces: ['application/json'],
        parameters: [{
            'name': 'id',
            'in': 'path',
            'description': 'group ID',
            'required': true,
            'type': 'string',
            'paramType': 'path'
        }]
    },
    action: function(req, res) {
        Promise.resolve( Group.find( {
            _id: req.params.id
        } ).remove().exec() )
            .then( function(result) {
                return User.find().exec();

            } )
            .then( function(users) {
                return Promise.all( users )
                    .map( function(user) {
                        return user.update( {
                            $pull: {
                                groups: req.params.id
                            }
                        } );
                    } );
            } )
            .then( function(result) {
                res.json( {
                    message: 'OK'
                } );
            } );

    }
};


var deleteUser = {
    spec: {
        path: '/devops/user/{id}',
        method: 'DELETE',
        notes: 'The method allows to delete an user',
        //summary: 'return items for the given criteria',
        //type: 'Category',
        nickname: 'deleteUser',
        produces: ['application/json'],
        parameters: [{
            'name': 'id',
            'in': 'path',
            'description': 'user ID',
            'required': true,
            'type': 'string',
            'paramType': 'path'
        }]
    },
    action: function(req, res) {
        Promise.resolve( User.find( {
            _id: req.params.id
        } ).remove().exec() )
            .then( function(result) {
                return Group.find().exec();

            } )
            .then( function(groups) {
                return Promise.all( groups )
                    .map( function(group) {
                        return group.update( {
                            $pull: {
                                users: req.params.id
                            }
                        } );
                    } );
            } )
            .then( function(result) {
                res.json( {
                    message: 'OK'
                } );
            } );

    }
};

var deleteInstance = {
    spec: {
        path: '/devops/instance/{id}',
        method: 'DELETE',
        notes: 'The method allows to delete an instance',
        //summary: 'return items for the given criteria',
        //type: 'Category',
        nickname: 'deleteInstance',
        produces: ['application/json'],
        parameters: [{
            'name': 'id',
            'in': 'path',
            'description': 'instance ID',
            'required': true,
            'type': 'string',
            'paramType': 'path'
        }]
    },
    action: function(req, res) {
        Promise.resolve( Instance.find( {
            _id: req.params.id
        } ).remove().exec() )
            .then( function(result) {
                return Stack.find().exec();

            } )
            .then( function(stacks) {
                return Promise.all( stacks )
                    .map( function(stack) {
                        return stack.update( {
                            $pull: {
                                instances: req.params.id
                            }
                        } );
                    } );
            } )
            .then( function(result) {
                res.json( {
                    message: 'OK'
                } );
            } );

    }
};

var deleteStack = {
    spec: {
        path: '/devops/stack/{id}',
        method: 'DELETE',
        notes: 'The method allows to delete an stack',
        //summary: 'return items for the given criteria',
        //type: 'Category',
        nickname: 'deleteStack',
        produces: ['application/json'],
        parameters: [{
            'name': 'id',
            'in': 'path',
            'description': 'stack ID',
            'required': true,
            'type': 'string',
            'paramType': 'path'
        }]
    },
    action: function(req, res) {
        Promise.resolve( Stack.find( {
            _id: req.params.id
        } ).remove().exec() )
            .then( function(result) {
                return Instance.find().exec();

            } )
            .then( function(instances) {
                return Promise.all( instances )
                    .map( function(instance) {
                        return instance.update( {
                            $pull: {
                                stacks: req.params.id
                            }
                        } );
                    } );
            } )
            .then( function(result) {
                res.json( {
                    message: 'OK'
                } );
            } );

    }
};

var deleteDeploy = {
    spec: {
        path: '/devops/deploy/{id}',
        method: 'DELETE',
        notes: 'The method allows to delete an deploy',
        //summary: 'return items for the given criteria',
        //type: 'Category',
        nickname: 'deleteDeploy',
        produces: ['application/json'],
        parameters: [{
            'name': 'id',
            'in': 'path',
            'description': 'deploy ID',
            'required': true,
            'type': 'string',
            'paramType': 'path'
        }]
    },
    action: function(req, res) {
        Promise.resolve( Deploy.find( {
            _id: req.params.id
        } ).remove().exec() )
            .then( function(result) {
                return Instance.find().exec();

            } )
            .then( function(instances) {
                return Promise.all( instances )
                    .map( function(instance) {
                        return instance.update( {
                            $pull: {
                                deploys: req.params.id
                            }
                        } );
                    } );
            } )
            .then( function(result) {
                res.json( {
                    message: 'OK'
                } );
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
                    return resolveUser( user );
                } ).then( function(users) {
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
            'application/x-www-form-urlencoded',
            'application/json'
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
            'application/x-www-form-urlencoded',
            'application/json'
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
            .then( function(stack) {
                res.json( stack );
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
            'application/x-www-form-urlencoded',
            'application/json'
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

                if (!stack) {
                    throw ObjectNotFoundError( 'Stack not found' );
                }

                var promises = [];

                promises.push( stack.update( {
                    $addToSet: {
                        instances: instance._id
                    }
                } ) );

                promises.push( instance.update( {
                    $addToSet: {
                        stacks: stack._id
                    }
                } ) );
                return Promise.all( promises );

            } )
            .then( function(result) {
                return Stack.findById( req.params.stackId ).exec();
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
            'application/x-www-form-urlencoded',
            'application/json'
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

                var promises = [];

                promises.push( instance.update( {
                    $addToSet: {
                        deploys: deploy._id
                    }
                } ) );

                return Promise.all( promises );
            } )
            .then( function(result) {
                return Instance.findById( req.params.instanceId ).exec();
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
            paramTypes.body( 'body', '(object) Modified User Properties', 'UserModification' )
        ],
    },
    action: function(req, res) {
        var promises = [];



        Promise.resolve( User.findById( req.params.userId ).exec() )
            .then( function(user) {

                var promises = [];


                var instancesToDelete = [];

                if (req.body.instances && req.body.instances.length) {
                    instancesToDelete = _.filter( user.instances, function(model) {
                        return !_.contains( req.body.instances, model.toString() );
                    } );
                    promises.push( user.update( {
                        $pullAll: {
                            instances: instancesToDelete
                        }
                    } ) );
                    promises.push( user.update( {
                        $addToSet: {
                            instances: {
                                $each: req.body.instances
                            }
                        }
                    } ) );
                } else {
                    // set instances to []
                    promises.push( user.update( {
                        $set: {
                            'instances': []
                        }
                    }, {
                            multi: true
                        } ) );
                }


                var stacksToDelete = [];

                if (req.body.stacks && req.body.stacks.length) {
                    stacksToDelete = _.filter( user.stacks, function(model) {
                        return !_.contains( req.body.stacks, model.toString() );
                    } );
                    promises.push( user.update( {
                        $pullAll: {
                            stacks: stacksToDelete
                        }
                    } ) );
                    promises.push( user.update( {
                        $addToSet: {
                            stacks: {
                                $each: req.body.stacks
                            }
                        }
                    } ) );
                } else {
                    // set instances to []
                    promises.push( user.update( {
                        $set: {
                            'stacks': []
                        }
                    }, {
                            multi: true
                        } ) );
                }



                return Promise.all( promises );


            } )
            .then( function(result) {
                return User.findById( req.params.userId ).exec();
            } )
            .then( function(user) {
                // res.json( user );

                return resolveUser( user );
                // 
            } ).then( function(user) {
            res.json( user );
        } );

    }
};


var updateStack = {
    spec: {
        // description: 'The method allows to retrieve items according to the given parameters',
        path: '/devops/stack/{stackId}',
        method: 'POST',
        notes: 'This method allows to update or modify a stack',
        //summary: 'return items for the given criteria',
        //type: 'Category',
        nickname: 'updateStack',
        consumes: ['application/json'],
        produces: ['application/json'],
        parameters: [{
            'name': 'stackId',
            'description': 'stack ID',
            'required': true,
            'type': 'string',
            'paramType': 'path'
            },
            paramTypes.body( 'body', '(object) Modified Stack Properties', 'StackModification' )
        ],
    },
    action: function(req, res) {

        Promise.resolve( Stack.findById( req.params.stackId ).exec() )
            .then( function(stack) {



                var promises = [];


                var instancesToDelete = [];

                if (req.body.instances && req.body.instances.length) {
                    instancesToDelete = _.filter( stack.instances, function(model) {
                        return !_.contains( req.body.instances, model.toString() );
                    } );
                    promises.push( stack.update( {
                        $pullAll: {
                            instances: instancesToDelete
                        }
                    } ) );
                    promises.push( stack.update( {
                        $addToSet: {
                            instances: {
                                $each: req.body.instances
                            }
                        }
                    } ) );
                } else {
                    // set instances to []
                    promises.push( stack.update( {
                        $set: {
                            'instances': []
                        }
                    }, {
                            multi: true
                        } ) );
                }



                return Promise.all( promises );


            } )
            .then( function(result) {
                return Stack.findById( req.params.stackId ).exec();
            } )
            .then( function(stack) {

                return resolveStack( stack );
                // 
            } )
            .then( function(stack) {
                res.json( stack );
            } );

    }
};

var updateDeploy = {
    spec: {
        // description: 'The method allows to retrieve items according to the given parameters',
        path: '/devops/deploy/{deployId}',
        method: 'POST',
        notes: 'This method allows to update or modify a deploy',
        //summary: 'return items for the given criteria',
        //type: 'Category',
        nickname: 'updateDeploy',
        consumes: ['application/json'],
        produces: ['application/json'],
        parameters: [{
            'name': 'deployId',
            'description': 'deploy ID',
            'required': true,
            'type': 'string',
            'paramType': 'path'
            },
            paramTypes.body( 'body', '(object) Modified Instance Properties', 'DeployModification' )
        ],
    },
    action: function(req, res) {

        Promise.resolve( Deploy.findById( req.params.deployId ).exec() )
            .then( function(deploy) {

                deploy.instance = req.body.instance;

                deploy.user = req.body.user;



                return deploy.save();


            } )
            .then( function(instance) {
                return resolveDeploy( instance );
            } )
            .then( function(instance) {
                res.json( instance );
            } );

    }
};


var updateInstance = {
    spec: {
        // description: 'The method allows to retrieve items according to the given parameters',
        path: '/devops/instance/{instanceId}',
        method: 'POST',
        notes: 'This method allows to update or modify a stack',
        //summary: 'return items for the given criteria',
        //type: 'Category',
        nickname: 'updateInstance',
        consumes: ['application/json'],
        produces: ['application/json'],
        parameters: [{
            'name': 'instanceId',
            'description': 'instance ID',
            'required': true,
            'type': 'string',
            'paramType': 'path'
            },
            paramTypes.body( 'body', '(object) Modified Instance Properties', 'InstanceModification' )
        ],
    },
    action: function(req, res) {

        Promise.resolve( Instance.findById( req.params.instanceId ).exec() )
            .then( function(instance) {


                if (req.body.serviceType) {
                    instance.serviceType = req.body.serviceType;
                }


                var promises = [];

                promises.push( instance.save() );


                var stacksToDelete = [];

                if (req.body.stacks && req.body.stacks.length) {
                    stacksToDelete = _.filter( instance.stacks, function(model) {
                        return !_.contains( req.body.stacks, model.toString() );
                    } );
                    promises.push( instance.update( {
                        $pullAll: {
                            stacks: stacksToDelete
                        }
                    } ) );
                    promises.push( instance.update( {
                        $addToSet: {
                            stacks: {
                                $each: req.body.stacks
                            }
                        }
                    } ) );
                } else {
                    // set instances to []
                    promises.push( instance.update( {
                        $set: {
                            'stacks': []
                        }
                    }, {
                            multi: true
                        } ) );
                }

                return Promise.all( promises );


            } )
            .then( function(result) {
                return Instance.findById( req.params.instanceId ).exec();
            } )
            .then( function(instance) {
                return resolveInstance( instance );
            } )
            .then( function(instance) {
                res.json( instance );
            } );

    }
};


var resolveStack = function(stack) {
    return new Promise( function(resolve, reject) {

            var instances = Promise.resolve( [] );


            if (stack.instances) {
                instances = Instance.find( {
                    '_id': {
                        $in: stack.instances
                    }
                } ).exec();
            }

            var stackPromise = Promise.resolve( stack );

            Promise.all( [instances, stackPromise] )
                .then( function(values) {

                    var instances = values[0];
                    var stack = values[1].toJSON();
                    stack.instances = instances;
                    return stack;
                } )
                .then( function(stack) {
                    resolve( stack );
                } );


        } );
};


var resolveInstance = function(instance) {
    return new Promise( function(resolve, reject) {

            var stacks = Promise.resolve( [] );


            if (instance.stacks) {
                stacks = Stack.find( {
                    '_id': {
                        $in: instance.stacks
                    }
                } ).exec();
            }

            var instancePromise = Promise.resolve( instance );

            Promise.all( [stacks, instancePromise] )
                .then( function(values) {

                    var stacks = values[0];
                    var instance = values[1].toJSON();
                    instance.stacks = stacks;
                    return instance;
                } )
                .then( function(instance) {
                    resolve( instance );
                } );


        } );
};

/**
 * private function
 *
 */
var resolveUser = function(user) {
    return new Promise( function(resolve, reject) {

            var groups = Promise.resolve( [] ),
                stacks = Promise.resolve( [] ),
                instances = Promise.resolve( [] );
            if (user.groups) {
                groups = Group.find( {
                    '_id': {
                        $in: user.groups
                    }
                } ).exec();
            }

            if (user.stacks) {
                stacks = Stack.find( {
                    '_id': {
                        $in: user.stacks
                    }
                } ).exec();
            }

            if (user.instances) {
                instances = Instance.find( {
                    '_id': {
                        $in: user.instances
                    }
                } ).exec();
            }

            var userPromise = Promise.resolve( user );

            Promise.all( [groups, stacks, instances, userPromise] )
                .then( function(values) {
                    var groups = values[0];
                    var stacks = values[1];
                    var instances = values[2];
                    var user = values[3].toJSON();
                    user.groups = groups;
                    user.stacks = stacks;
                    user.instances = instances;
                    return user;
                } )
                .then( function(user) {
                    resolve( user );
                } );


        } );
};

var addInstanceToUser = {
    spec: {
        path: '/devops/user/{userId}/instance',
        method: 'POST',
        notes: 'The method allows to add a instance to a user',
        nickname: 'addInstanceToUser',
        consumes: [
            'application/x-www-form-urlencoded',
            'application/json'
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
                return user.update( {
                    $addToSet: {
                        instances: instance
                    }
                } );
            } )
            .then( function(result) {
                return User.findById( req.params.userId ).exec();
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
            'application/x-www-form-urlencoded',
            'application/json'
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
        var stack = Stack.findById( req.body.stack ).exec();
        Promise.all( [user, stack] )
            .then( function(values) {
                var user = values[0],
                    stack = values[1];

                return user.update( {
                    $addToSet: {
                        stacks: stack
                    }
                } );
            } )
            .then( function(result) {
                return User.findById( req.params.userId ).exec();
            } )
            .then( function(user) {
                return resolveUser( user );
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
            stacks: req.params.stackId
        } ).exec()
            .then( function(instances) {
                //res.json(instances);
                Promise.all( instances ).map( function(instance) {
                    return resolveInstance( instance );
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
                    return resolveInstance( instance );
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
            'application/x-www-form-urlencoded',
            'application/json'
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
            'name': 'stacks',
            'in': 'formData',
            'description': 'array of stack ID',
            'required': true,
            'type': 'array',
            'items': {
                'type': 'string'
            },
            'paramType': 'form'
            }, {
            'name': 'description',
            'in': 'formData',
            'description': 'group description',
            'type': 'string',
            'paramType': 'form'
            }, {
            'name': 'serviceType',
            'in': 'formData',
            'description': 'service Type',
            'type': 'string',
            'paramType': 'form'
        }],
    },
    action: function(req, res) {

        var createdInstance;
        console.log( req.body.serviceType );
        Promise.resolve()
            .then( function() {
                return Instance.create( req.body );
            } )
            .then( function(instance) {
                createdInstance = instance;
                if (!(instance.stacks && instance.stacks.length)) {
                    return Promise.resolve( [] );
                }
                return Stack.find( {
                    _id: {
                        $in: instance.stacks
                    }
                } ).exec();
            } )
            .then( function(stacks) {
                var promises = [];
                _.map( stacks, function(stack) {
                    promises.push( stack.update( {
                        $addToSet: {
                            instances: createdInstance
                        }
                    } ) );
                } );
                return Promise.all( promises );
            } )
            .then( function(result) {
                return resolveInstance( createdInstance );
            } )
            .then( function(instance) {
                res.json( instance );
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
            .then( function(deploys) {
                res.json( deploys );

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
            'application/x-www-form-urlencoded',
            'application/json'
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
            .then( function(deploy) {
                res.json( deploy );
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
            'application/x-www-form-urlencoded',
            'application/json'
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
                if (!group) {
                    throw ObjectNotFoundError( 'Group not found' );
                }

                if (!user) {
                    throw ObjectNotFoundError( 'User not found' );
                }

                var promises = [];

                promises.push( user.update( {
                    $addToSet: {
                        groups: group
                    }
                } ) );


                promises.push( group.update( {
                    $addToSet: {
                        users: user
                    }
                } ) );


                return Promise.all( promises );

            } )
            .then( function(values) {
                res.json( values );
            } )
            .catch( function(err) {
                res.status( 500 ).send( err );
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
            'application/x-www-form-urlencoded',
            'application/json'
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
                var promises = [];


                if (!group) {
                    throw ObjectNotFoundError( 'Group not found' );
                }

                if (!user) {
                    throw ObjectNotFoundError( 'User not found' );
                }

                promises.push( user.update( {
                    $addToSet: {
                        groups: group
                    }
                } ) );


                promises.push( group.update( {
                    $addToSet: {
                        users: user
                    }
                } ) );


                return Promise.all( promises );



            } )
            .then( function(values) {
                res.json( values );
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
        Promise.resolve( Group.find().exec() )
            .then( function(groups) {
                return Promise.all( groups )
                    .map( function(group) {
                        return resolveGroup( group );
                    } );
            } )
            .then( function(groups) {
                res.json( groups );
            } );

    }
};

var resolveGroup = function(group) {
    return Promise.resolve( User.find( {
        '_id': {
            $in: group.users
        }
    } ).exec() )
        .then( function(users) {
            group = group.toJSON();
            group.users = users;
            return group;
        } );
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
        Promise.resolve( Group.findById( req.params.groupId ).exec() )
            .then( function(group) {
                if (!group) {
                    throw ObjectNotFoundError( 'Group not found' );
                }
                return User.find( {
                    '_id': {
                        $in: group.users
                    }
                } ).exec();
            } )
            .then( function(users) {
                // res.json(users);
                return Promise.all( users ).map( function(user) {
                    return resolveUser( user );
                } );

            } )
            .then( function(users) {
                res.json( users );
            } )
            .catch( ObjectNotFoundError, function(err) {
                res.status( 500 ).
                    json( {
                        message: err.message
                    } );
            } )
            .catch( mongoose.Error.CastError, function(err) {
                res.status( 500 ).
                    json( {
                        message: err.message
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
            'application/x-www-form-urlencoded',
            'application/json'
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
                        return resolveDeploy( deploy );
                    } )
                    .then( function(deploys) {
                        res.json( deploys );
                    } );

            } );

    }
};

var methods = [deleteEnvironment, deleteGroup, deleteUser, deleteStack, deleteInstance, deleteDeploy,
    listUsers, getUsersByGroupId, listGroup, createGroup, addUserToGroup, addUserToGroupByName, listEnvironments, createEnvironment,
    getStackByEnvironmentId, createStack, createInstance, listInstances, getInstanceByStackId, getDeployByInstance, createDeploy,
    listStacks, listDeploys, addInstanceToUser, addStackToUser, addInstanceToStack, addDeployToInstance,
    updateUser, updateStack, updateInstance, updateDeploy
];

module.exports = function(swagger) {
    _.each( methods, function(method) {
        var operation = swaggerMethods[method.spec.method];
        swagger[operation]( method );
    } );
};