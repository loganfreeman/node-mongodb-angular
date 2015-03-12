module.exports = function (bookshelf) {
    var Environment = bookshelf.Model.extend({
        tableName: 'environment'
    });


    bookshelf['environment'] = Environment;
}