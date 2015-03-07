module.exports = function(sequelize, DataTypes) {
    var Todo = sequelize.define( 'Todo', {
        text: DataTypes.STRING
    }, {
            paranoid: false,
            timestamps: false,
            tableName: 'notes'
        } );

    return Todo;
};
