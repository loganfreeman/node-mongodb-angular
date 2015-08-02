module.exports = function (bookshelf) {
    var Group = bookshelf.Model.extend({
        tableName: 'groups'
    });


    bookshelf['groups'] = Group;
}