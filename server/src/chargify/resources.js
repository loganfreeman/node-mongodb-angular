var sw = require( 'swagger-node-express' );
var paramTypes = sw.paramTypes;
var url = require( 'url' );
var swe = sw.errors;

var chargify = require( '../controller/chargifyController.js' );

var _ = require( 'lodash' );


var getCustomers = {
    spec: {
        path: '/chargify/customers',
        method: 'GET',
        notes: 'The method allows to retrieve list of customers',
        //summary: 'return items for the given criteria',
        //type: 'Category',
        nickname: 'getCustomers',
        produces: ['application/json'],
    },
    action: function(req, res) {
        chargify.getCustomers()
            .then( function(models) {
                res.json( models );
            } );
    }
};
var methods = [getCustomers];

var swaggerMethods = require( '../swaggerMethodMap.js' );

module.exports = function(swagger) {
    _.each( methods, function(method) {
        var operation = swaggerMethods[method.spec.method];
        swagger[operation]( method );
    } );
};