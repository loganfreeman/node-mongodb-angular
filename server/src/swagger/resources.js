var sw = require( 'swagger-node-express' );
var paramTypes = sw.paramTypes;
var url = require( 'url' );
var swe = sw.errors;

var zabbix = require( '../controller/zabbixController.js' );

var _ = require( 'lodash' );

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


var methods = [getItem, itemNotFound];

module.exports = function(swagger) {
    _.each( methods, function(method) {
        var operation = swaggerMethods[method.spec.method];
        swagger[operation]( method );
    } );
};