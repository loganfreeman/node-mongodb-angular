var sw = require( 'swagger-node-express' );
var paramTypes = sw.paramTypes;
var url = require( 'url' );
var swe = sw.errors;

var zuora = require( '../controller/zuoraController.js' );

var _ = require( 'lodash' );


var getCatalog = {
    spec: {
        path: '/zuora/catalogs',
        method: 'GET',
        notes: 'The method allows to retrieve list of catalogs',
        //summary: 'return items for the given criteria',
        //type: 'Category',
        nickname: 'getCatalog',
        produces: ['application/json'],
    },
    action: function(req, res) {
        zuora.getCatalog()
            .then( function(models) {
                res.json( models );
            } );
    }
};
var methods = [getCatalog];

var swaggerMethods = require( '../swaggerMethodMap.js' );

module.exports = function(swagger) {
    _.each( methods, function(method) {
        var operation = swaggerMethods[method.spec.method];
        swagger[operation]( method );
    } );
};