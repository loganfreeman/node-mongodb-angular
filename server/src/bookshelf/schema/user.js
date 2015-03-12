module.exports = function (bookshelf) {
    var User = bookshelf.Model.extend({
        tableName: 'users'
    });


    bookshelf['users'] = User;
}