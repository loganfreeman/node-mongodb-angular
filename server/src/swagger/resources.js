var sw = require( 'swagger-node-express' );
var paramTypes = sw.paramTypes;
var url = require( 'url' );
var swe = sw.errors;

var zabbix = require( '../controller/zabbixController.js' );

var _ = require( 'lodash' );

var getApplication = {
    spec: {
        // description: 'The method allows to retrieve items according to the given parameters',
        path: '/zabbix/application/get',
        method: 'POST',
        notes: 'The method allows to retrieve items according to the given parameters',
        //summary: 'return items for the given criteria',
        //type: 'Category',
        nickname: 'getItem',
        consumes: ['application/json'],
        produces: ['application/json'],
        responseMessages: [swe.notFound( 'item' )],
        parameters: [paramTypes.body( 'body', '(object) Parameters defining the desired output', 'Option' )],
    },
    action: function(req, res) {
        zabbix.getItem( req.body )
            .then( function(items) {
                res.json( items );
            } )
            .catch( function(err) {
                throw swe.notFound( 'item', res );
            } );
    }
};

var applicationExists = {
    spec: {
        // description: 'The method allows to retrieve items according to the given parameters',
        path: '/zabbix/application/exists',
        method: 'POST',
        notes: 'The method allows to retrieve items according to the given parameters',
        //summary: 'return items for the given criteria',
        //type: 'Category',
        nickname: 'getItem',
        consumes: ['application/json'],
        produces: ['application/json'],
        responseMessages: [swe.notFound( 'item' )],
        parameters: [paramTypes.body( 'body', '(object) Parameters defining the desired output', 'Option' )],
    },
    action: function(req, res) {
        zabbix.getItem( req.body )
            .then( function(items) {
                res.json( items );
            } )
            .catch( function(err) {
                throw swe.notFound( 'item', res );
            } );
    }
};

var itemExists = {
    spec: {
        // description: 'The method allows to retrieve items according to the given parameters',
        path: '/zabbix/item/exists',
        method: 'POST',
        notes: 'The method allows to retrieve items according to the given parameters',
        //summary: 'return items for the given criteria',
        //type: 'Category',
        nickname: 'getItem',
        consumes: ['application/json'],
        produces: ['application/json'],
        responseMessages: [swe.notFound( 'item' )],
        parameters: [paramTypes.body( 'body', '(object) Parameters defining the desired output', 'Option' )],
    },
    action: function(req, res) {
        zabbix.getItem( req.body )
            .then( function(items) {
                res.json( items );
            } )
            .catch( function(err) {
                throw swe.notFound( 'item', res );
            } );
    }
};

var getMaintenance = {
    spec: {
        // description: 'The method allows to retrieve items according to the given parameters',
        path: '/zabbix/maintenance/get',
        method: 'POST',
        notes: 'The method allows to retrieve items according to the given parameters',
        //summary: 'return items for the given criteria',
        //type: 'Category',
        nickname: 'getItem',
        consumes: ['application/json'],
        produces: ['application/json'],
        responseMessages: [swe.notFound( 'item' )],
        parameters: [paramTypes.body( 'body', '(object) Parameters defining the desired output', 'Option' )],
    },
    action: function(req, res) {
        zabbix.getItem( req.body )
            .then( function(items) {
                res.json( items );
            } )
            .catch( function(err) {
                throw swe.notFound( 'item', res );
            } );
    }
};

var maintenanceExists = {
    spec: {
        // description: 'The method allows to retrieve items according to the given parameters',
        path: '/zabbix/maintenance/exists',
        method: 'POST',
        notes: 'The method allows to retrieve items according to the given parameters',
        //summary: 'return items for the given criteria',
        //type: 'Category',
        nickname: 'getItem',
        consumes: ['application/json'],
        produces: ['application/json'],
        responseMessages: [swe.notFound( 'item' )],
        parameters: [paramTypes.body( 'body', '(object) Parameters defining the desired output', 'Option' )],
    },
    action: function(req, res) {
        zabbix.getItem( req.body )
            .then( function(items) {
                res.json( items );
            } )
            .catch( function(err) {
                throw swe.notFound( 'item', res );
            } );
    }
};

var getHostInterface = {
    spec: {
        // description: 'The method allows to retrieve items according to the given parameters',
        path: '/zabbix/hostinterface/get',
        method: 'POST',
        notes: 'The method allows to retrieve items according to the given parameters',
        //summary: 'return items for the given criteria',
        //type: 'Category',
        nickname: 'getItem',
        consumes: ['application/json'],
        produces: ['application/json'],
        responseMessages: [swe.notFound( 'item' )],
        parameters: [paramTypes.body( 'body', '(object) Parameters defining the desired output', 'Option' )],
    },
    action: function(req, res) {
        zabbix.getItem( req.body )
            .then( function(items) {
                res.json( items );
            } )
            .catch( function(err) {
                throw swe.notFound( 'item', res );
            } );
    }
};

var hostInterfaceExists = {
    spec: {
        // description: 'The method allows to retrieve items according to the given parameters',
        path: '/zabbix/hostinterface/exists',
        method: 'POST',
        notes: 'The method allows to retrieve items according to the given parameters',
        //summary: 'return items for the given criteria',
        //type: 'Category',
        nickname: 'getItem',
        consumes: ['application/json'],
        produces: ['application/json'],
        responseMessages: [swe.notFound( 'item' )],
        parameters: [paramTypes.body( 'body', '(object) Parameters defining the desired output', 'Option' )],
    },
    action: function(req, res) {
        zabbix.getItem( req.body )
            .then( function(items) {
                res.json( items );
            } )
            .catch( function(err) {
                throw swe.notFound( 'item', res );
            } );
    }
};

var getHostGroup = {
    spec: {
        // description: 'The method allows to retrieve items according to the given parameters',
        path: '/zabbix/hostgroup/get',
        method: 'POST',
        notes: 'The method allows to retrieve items according to the given parameters',
        //summary: 'return items for the given criteria',
        //type: 'Category',
        nickname: 'getItem',
        consumes: ['application/json'],
        produces: ['application/json'],
        responseMessages: [swe.notFound( 'item' )],
        parameters: [paramTypes.body( 'body', '(object) Parameters defining the desired output', 'Option' )],
    },
    action: function(req, res) {
        zabbix.getItem( req.body )
            .then( function(items) {
                res.json( items );
            } )
            .catch( function(err) {
                throw swe.notFound( 'item', res );
            } );
    }
};

var hostGroupExists = {
    spec: {
        // description: 'The method allows to retrieve items according to the given parameters',
        path: '/zabbix/hostgroup/exists',
        method: 'POST',
        notes: 'The method allows to retrieve items according to the given parameters',
        //summary: 'return items for the given criteria',
        //type: 'Category',
        nickname: 'getItem',
        consumes: ['application/json'],
        produces: ['application/json'],
        responseMessages: [swe.notFound( 'item' )],
        parameters: [paramTypes.body( 'body', '(object) Parameters defining the desired output', 'Option' )],
    },
    action: function(req, res) {
        zabbix.getItem( req.body )
            .then( function(items) {
                res.json( items );
            } )
            .catch( function(err) {
                throw swe.notFound( 'item', res );
            } );
    }
};

var getHistory = {
    spec: {
        // description: 'The method allows to retrieve items according to the given parameters',
        path: '/zabbix/history/get',
        method: 'POST',
        notes: 'The method allows to retrieve items according to the given parameters',
        //summary: 'return items for the given criteria',
        //type: 'Category',
        nickname: 'getItem',
        consumes: ['application/json'],
        produces: ['application/json'],
        responseMessages: [swe.notFound( 'item' )],
        parameters: [paramTypes.body( 'body', '(object) Parameters defining the desired output', 'Option' )],
    },
    action: function(req, res) {
        zabbix.getItem( req.body )
            .then( function(items) {
                res.json( items );
            } )
            .catch( function(err) {
                throw swe.notFound( 'item', res );
            } );
    }
};

var getEvent = {
    spec: {
        // description: 'The method allows to retrieve items according to the given parameters',
        path: '/zabbix/event/get',
        method: 'POST',
        notes: 'The method allows to retrieve items according to the given parameters',
        //summary: 'return items for the given criteria',
        //type: 'Category',
        nickname: 'getItem',
        consumes: ['application/json'],
        produces: ['application/json'],
        responseMessages: [swe.notFound( 'item' )],
        parameters: [paramTypes.body( 'body', '(object) Parameters defining the desired output', 'Option' )],
    },
    action: function(req, res) {
        zabbix.getItem( req.body )
            .then( function(items) {
                res.json( items );
            } )
            .catch( function(err) {
                throw swe.notFound( 'item', res );
            } );
    }
};

var getServiceAvailability = {
    spec: {
        // description: 'The method allows to retrieve items according to the given parameters',
        path: '/zabbix/serviceavailability/get',
        method: 'POST',
        notes: 'The method allows to retrieve items according to the given parameters',
        //summary: 'return items for the given criteria',
        //type: 'Category',
        nickname: 'getItem',
        consumes: ['application/json'],
        produces: ['application/json'],
        responseMessages: [swe.notFound( 'item' )],
        parameters: [paramTypes.body( 'body', '(object) Parameters defining the desired output', 'Option' )],
    },
    action: function(req, res) {
        zabbix.getItem( req.body )
            .then( function(items) {
                res.json( items );
            } )
            .catch( function(err) {
                throw swe.notFound( 'item', res );
            } );
    }
};

var checkHost = {
    spec: {
        // description: 'The method allows to retrieve items according to the given parameters',
        path: '/zabbix/host/exits',
        method: 'POST',
        notes: 'The method allows to retrieve items according to the given parameters',
        //summary: 'return items for the given criteria',
        //type: 'Category',
        nickname: 'getItem',
        consumes: ['application/json'],
        produces: ['application/json'],
        responseMessages: [swe.notFound( 'item' )],
        parameters: [paramTypes.body( 'body', '(object) Parameters defining the desired output', 'Option' )],
    },
    action: function(req, res) {
        zabbix.getItem( req.body )
            .then( function(items) {
                res.json( items );
            } )
            .catch( function(err) {
                throw swe.notFound( 'item', res );
            } );
    }
};

var getHost = {
    spec: {
        // description: 'The method allows to retrieve items according to the given parameters',
        path: '/zabbix/host/get',
        method: 'POST',
        notes: 'The method allows to retrieve items according to the given parameters',
        //summary: 'return items for the given criteria',
        //type: 'Category',
        nickname: 'getItem',
        consumes: ['application/json'],
        produces: ['application/json'],
        responseMessages: [swe.notFound( 'item' )],
        parameters: [paramTypes.body( 'body', '(object) Parameters defining the desired output', 'Option' )],
    },
    action: function(req, res) {
        zabbix.getItem( req.body )
            .then( function(items) {
                res.json( items );
            } )
            .catch( function(err) {
                throw swe.notFound( 'item', res );
            } );
    }
};

var getItem = {
    spec: {
        // description: 'The method allows to retrieve items according to the given parameters',
        path: '/zabbix/item/get',
        method: 'POST',
        notes: 'The method allows to retrieve items according to the given parameters',
        //summary: 'return items for the given criteria',
        //type: 'Category',
        nickname: 'getItem',
        consumes: ['application/json'],
        produces: ['application/json'],
        responseMessages: [swe.notFound( 'item' )],
        parameters: [paramTypes.body( 'body', '(object) Parameters defining the desired output', 'Option' )],
    },
    action: function(req, res) {
        zabbix.getItem( req.body )
            .then( function(items) {
                res.json( items );
            } )
            .catch( function(err) {
                throw swe.notFound( 'item', res );
            } );
    }
};

var itemNotFound = {
    spec: {
        notes: 'throw item not found',
        path: '/zabbix/item/not/found',
        method: 'GET',
        nickname: 'itemNotFound',
        responseMessages: [swe.notFound( 'item' )]
    },
    action: function(req, res) {
        throw swe.notFound( 'item', res );
    }
};


var swaggerMethods = {
    'POST': 'addPost',
    'GET': 'addGet',
    'DELETE': 'addDelete',
    'PUT': 'addPut'
};


var methods = [itemNotFound, getApplication, applicationExists, getItem, itemExists, getMaintenance,
    maintenanceExists, getHostInterface, hostInterfaceExists, getHostGroup, hostGroupExists, getHistory, getEvent, getServiceAvailability,
checkHost, getHost];

module.exports = function(swagger) {
    _.each( methods, function(method) {
        var operation = swaggerMethods[method.spec.method];
        swagger[operation]( method );
    } );
};