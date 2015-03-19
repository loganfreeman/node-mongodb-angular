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
    }


};