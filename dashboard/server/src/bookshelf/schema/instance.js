module.exports = function (bookshelf) {
    var Instance = bookshelf.Model.extend({
        tableName: 'instance'
    });


    bookshelf['instance'] = Instance;
}