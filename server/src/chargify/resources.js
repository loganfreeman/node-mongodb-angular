var sw = require( 'swagger-node-express' );
var paramTypes = sw.paramTypes;
var url = require( 'url' );
var swe = sw.errors;

var zabbix = require( '../controller/chargifyController.js' );

var _ = require( 'lodash' );

var methods = [];

var swaggerMethods = require( '../swaggerMethodMap.js' );

module.exports = function(swagger) {
    _.each( methods, function(method) {
        var operation = swaggerMethods[method.spec.method];
        swagger[operation]( method );
    } );
};