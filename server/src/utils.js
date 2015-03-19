/**
 *
 *
 * @author scheng
 * @module utils
 */

module.exports.where = function(key, value) {
    var params = {};
    params.where = {
        key: value
    };
    return params;
};