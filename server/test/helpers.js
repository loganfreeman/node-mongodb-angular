/**
 * @author scheng
 * @module helpers
 */


var _ = require( 'lodash' );
var expect = require( 'chai' ).expect,
    should = require( 'chai' ).should();


var config = require( '../src/config/config.js' );

var _ = require( 'lodash' );

var port = config.getPort();

var protocol = config.getProtocol();

var host = config.getHost();

var url = require( 'url' );



module.exports = {

    isJSONArray: function(arr) {
        return Array.isArray( arr );
    },
    verifyArray: function(arr, type) {
        arr.should.be.instanceof( Array );
        _.each( arr, function(item) {
            item.should.be.instanceof( type );
        } );
    },
    /**
     * 
     * check if the err.detail is Key (name)=(value) already exists. 
     * @param  {Error}
     * @return {boolean}
     */
    keyExists: function(err) {
        return err.detail.match( /Key .* already exists/ );
    },

    verifyId: function(model, type) {
        model.should.have.property( 'id' );
        model.should.be.instanceof( type );
    },


    /**
     * construct a Url
     * @param  {String} path   Url path
     * @param  {Object} params query parameters 
     * @return {String}        Url
     */
    getUrl: function(path, params) {
        var query = {};
        if (typeof params === 'object') {
            query = params;
        }
        return url.format( {
            hostname: host,
            protocol: protocol,
            port: port,
            pathname: path,
            query: query
        } );
    }


};