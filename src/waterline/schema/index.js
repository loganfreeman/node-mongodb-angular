var fs = require('fs'),
    path = require('path');


module.exports = function (orm) {
    fs.readdirSync(__dirname)
        .filter(function (file) {
            return ((file.indexOf('.') !== 0) && (file !== 'index.js') && (file.slice(-3) == '.js'));
        })
        .forEach(function (file) {
            require('./' + file)(orm);
        });

}