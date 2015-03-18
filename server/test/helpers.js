/**
 * @author scheng
 * @module helpers
 */


var _ = require( 'lodash' );
var expect = require( 'chai' ).expect,
    should = require( 'chai' ).should();



module.exports = {
    verifyArray: function(arr, type) {
        arr.should.be.instanceof( Array );
        _.each( arr, function(item) {
            item.should.be.instanceof( type );
        } );
    }
};