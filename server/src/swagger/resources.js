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
        notes: 'The method allows to retrieve applications according to the given parameters',
        //summary: 'return items for the given criteria',
        //type: 'Category',
        nickname: 'getApplication',
        consumes: ['application/json'],
        produces: ['application/json'],
        responseMessages: [swe.notFound( 'application' )],
        parameters: [paramTypes.body( 'body', '(object) Parameters defining the desired output', 'Option' )],
    },
    action: function(req, res) {
        zabbix.getApplication( req.body )
            .then( function(items) {
                res.json( items );
            } )
            .catch( function(err) {
                throw swe.notFound( 'application', res );
            } );
    }
};

var applicationExists = {
    spec: {
        // description: 'The method allows to retrieve items according to the given parameters',
        path: '/zabbix/application/exists',
        method: 'POST',
        notes: 'This method checks if at least one application that matches the given filter criteria exists.',
        //summary: 'return items for the given criteria',
        //type: 'Category',
        nickname: 'applicationExists',
        consumes: ['application/json'],
        produces: ['application/json'],
        responseMessages: [swe.notFound( 'application' )],
        parameters: [paramTypes.body( 'body', '(object) Parameters defining the desired output', 'Option' )],
    },
    action: function(req, res) {
        zabbix.applicationExists( req.body )
            .then( function(items) {
                res.json( items );
            } )
            .catch( function(err) {
                throw swe.notFound( 'application', res );
            } );
    }
};

var itemExists = {
    spec: {
        // description: 'The method allows to retrieve items according to the given parameters',
        path: '/zabbix/item/exists',
        method: 'POST',
        notes: 'This method checks if at least one item that matches the given filter criteria exists.',
        //summary: 'return items for the given criteria',
        //type: 'Category',
        nickname: 'itemExists',
        consumes: ['application/json'],
        produces: ['application/json'],
        responseMessages: [swe.notFound( 'item' )],
        parameters: [paramTypes.body( 'body', '(object) Parameters defining the desired output', 'Option' )],
    },
    action: function(req, res) {
        zabbix.itemExists( req.body )
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
        notes: 'The method allows to retrieve maintenances according to the given parameters.',
        //summary: 'return items for the given criteria',
        //type: 'Category',
        nickname: 'getMaintenance',
        consumes: ['application/json'],
        produces: ['application/json'],
        responseMessages: [swe.notFound( 'maintenance' )],
        parameters: [paramTypes.body( 'body', '(object) Parameters defining the desired output', 'Option' )],
    },
    action: function(req, res) {
        zabbix.getMaintenance( req.body )
            .then( function(items) {
                res.json( items );
            } )
            .catch( function(err) {
                throw swe.notFound( 'maintenance', res );
            } );
    }
};

var maintenanceExists = {
    spec: {
        // description: 'The method allows to retrieve items according to the given parameters',
        path: '/zabbix/maintenance/exists',
        method: 'POST',
        notes: 'This method checks if at least one maintenance that matches the given filter criteria exists.',
        //summary: 'return items for the given criteria',
        //type: 'Category',
        nickname: 'maintenanceExists',
        consumes: ['application/json'],
        produces: ['application/json'],
        responseMessages: [swe.notFound( 'maintenance' )],
        parameters: [paramTypes.body( 'body', '(object) Parameters defining the desired output', 'Option' )],
    },
    action: function(req, res) {
        zabbix.maintenanceExists( req.body )
            .then( function(items) {
                res.json( items );
            } )
            .catch( function(err) {
                throw swe.notFound( 'maintenance', res );
            } );
    }
};

var getHostInterface = {
    spec: {
        // description: 'The method allows to retrieve items according to the given parameters',
        path: '/zabbix/hostinterface/get',
        method: 'POST',
        notes: 'The method allows to retrieve host interfaces according to the given parameters.',
        //summary: 'return items for the given criteria',
        //type: 'Category',
        nickname: 'getHostInterface',
        consumes: ['application/json'],
        produces: ['application/json'],
        responseMessages: [swe.notFound( 'host interfaces' )],
        parameters: [paramTypes.body( 'body', '(object) Parameters defining the desired output', 'Option' )],
    },
    action: function(req, res) {
        zabbix.getHostInterface( req.body )
            .then( function(items) {
                res.json( items );
            } )
            .catch( function(err) {
                throw swe.notFound( 'host interfaces', res );
            } );
    }
};

var hostInterfaceExists = {
    spec: {
        // description: 'The method allows to retrieve items according to the given parameters',
        path: '/zabbix/hostinterface/exists',
        method: 'POST',
        notes: 'This method checks if at least one host interface that matches the given filter criteria exists.',
        //summary: 'return items for the given criteria',
        //type: 'Category',
        nickname: 'hostInterfaceExists',
        consumes: ['application/json'],
        produces: ['application/json'],
        responseMessages: [swe.notFound( 'host interfaces' )],
        parameters: [paramTypes.body( 'body', '(object) Parameters defining the desired output', 'Option' )],
    },
    action: function(req, res) {
        zabbix.hostInterfaceExists( req.body )
            .then( function(items) {
                res.json( items );
            } )
            .catch( function(err) {
                throw swe.notFound( 'host interfaces', res );
            } );
    }
};

var getHostGroup = {
    spec: {
        // description: 'The method allows to retrieve items according to the given parameters',
        path: '/zabbix/hostgroup/get',
        method: 'POST',
        notes: 'The method allows to retrieve host groups according to the given parameters',
        //summary: 'return items for the given criteria',
        //type: 'Category',
        nickname: 'getHostGroup',
        consumes: ['application/json'],
        produces: ['application/json'],
        responseMessages: [swe.notFound( 'host groups' )],
        parameters: [paramTypes.body( 'body', '(object) Parameters defining the desired output', 'Option' )],
    },
    action: function(req, res) {
        zabbix.getHostGroup( req.body )
            .then( function(items) {
                res.json( items );
            } )
            .catch( function(err) {
                throw swe.notFound( 'host groups', res );
            } );
    }
};

var hostGroupExists = {
    spec: {
        // description: 'The method allows to retrieve items according to the given parameters',
        path: '/zabbix/hostgroup/exists',
        method: 'POST',
        notes: 'This method checks if at least one host group that matches the given filter criteria exists.',
        //summary: 'return items for the given criteria',
        //type: 'Category',
        nickname: 'hostGroupExists',
        consumes: ['application/json'],
        produces: ['application/json'],
        responseMessages: [swe.notFound( 'host group' )],
        parameters: [paramTypes.body( 'body', '(object) Parameters defining the desired output', 'Option' )],
    },
    action: function(req, res) {
        zabbix.hostGroupExists( req.body )
            .then( function(items) {
                res.json( items );
            } )
            .catch( function(err) {
                throw swe.notFound( 'host group', res );
            } );
    }
};

var getHistory = {
    spec: {
        // description: 'The method allows to retrieve items according to the given parameters',
        path: '/zabbix/history/get',
        method: 'POST',
        notes: 'The method allows to retrieve history data according to the given parameters.',
        //summary: 'return items for the given criteria',
        //type: 'Category',
        nickname: 'getHistory',
        consumes: ['application/json'],
        produces: ['application/json'],
        responseMessages: [swe.notFound( 'history data' )],
        parameters: [paramTypes.body( 'body', '(object) Parameters defining the desired output', 'Option' )],
    },
    action: function(req, res) {
        zabbix.getHistory( req.body )
            .then( function(items) {
                res.json( items );
            } )
            .catch( function(err) {
                throw swe.notFound( 'history data', res );
            } );
    }
};

var getEvent = {
    spec: {
        // description: 'The method allows to retrieve items according to the given parameters',
        path: '/zabbix/event/get',
        method: 'POST',
        notes: 'The method allows to retrieve events according to the given parameters',
        //summary: 'return items for the given criteria',
        //type: 'Category',
        nickname: 'getEvent',
        consumes: ['application/json'],
        produces: ['application/json'],
        responseMessages: [swe.notFound( 'event' )],
        parameters: [paramTypes.body( 'body', '(object) Parameters defining the desired output', 'Option' )],
    },
    action: function(req, res) {
        zabbix.getEvent( req.body )
            .then( function(items) {
                res.json( items );
            } )
            .catch( function(err) {
                throw swe.notFound( 'event', res );
            } );
    }
};

var getServiceAvailability = {
    spec: {
        // description: 'The method allows to retrieve items according to the given parameters',
        path: '/zabbix/serviceavailability/get',
        method: 'POST',
        notes: 'This method allows to calculate availability information about IT services.',
        //summary: 'return items for the given criteria',
        //type: 'Category',
        nickname: 'getServiceAvailability',
        consumes: ['application/json'],
        produces: ['application/json'],
        responseMessages: [swe.notFound( 'service availability' )],
        parameters: [paramTypes.body( 'body', '(object) Parameters defining the desired output', 'Option' )],
    },
    action: function(req, res) {
        zabbix.getServiceAvailability( req.body )
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
        notes: 'This method checks if at least one host that matches the given filter criteria exists.',
        //summary: 'return items for the given criteria',
        //type: 'Category',
        nickname: 'checkHost',
        consumes: ['application/json'],
        produces: ['application/json'],
        responseMessages: [swe.notFound( 'host' )],
        parameters: [paramTypes.body( 'body', '(object) Parameters defining the desired output', 'Option' )],
    },
    action: function(req, res) {
        zabbix.checkHost( req.body )
            .then( function(items) {
                res.json( items );
            } )
            .catch( function(err) {
                throw swe.notFound( 'host', res );
            } );
    }
};

var getHost = {
    spec: {
        // description: 'The method allows to retrieve items according to the given parameters',
        path: '/zabbix/host/get',
        method: 'POST',
        notes: 'The method allows to retrieve hosts according to the given parameters',
        //summary: 'return items for the given criteria',
        //type: 'Category',
        nickname: 'getHost',
        consumes: ['application/json'],
        produces: ['application/json'],
        responseMessages: [swe.notFound( 'host' )],
        parameters: [paramTypes.body( 'body', '(object) Parameters defining the desired output', 'Option' )],
    },
    action: function(req, res) {
        zabbix.getHost( req.body )
            .then( function(items) {
                res.json( items );
            } )
            .catch( function(err) {
                throw swe.notFound( 'host', res );
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


var swaggerMethods = require( '../swaggerMethodMap.js' );



var methods = [itemNotFound, getApplication, applicationExists, getItem, itemExists, getMaintenance,
    maintenanceExists, getHostInterface, hostInterfaceExists, getHostGroup, hostGroupExists, getHistory, getEvent, getServiceAvailability,
checkHost, getHost];

module.exports = function(swagger) {
    _.each( methods, function(method) {
        var operation = swaggerMethods[method.spec.method];
        swagger[operation]( method );
    } );
};