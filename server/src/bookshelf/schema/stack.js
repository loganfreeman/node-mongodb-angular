module.exports = function (bookshelf) {
    var Stack = bookshelf.Model.extend({
        tableName: 'stack'
    });


    bookshelf['stack'] = Stack;
}