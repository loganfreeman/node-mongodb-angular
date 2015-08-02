module.exports = function(sequelize, DataTypes) {
    var Stack = sequelize.define( 'Stack', {
        name: DataTypes.STRING,
        description: DataTypes.STRING

    }, {
            paranoid: false,
            timestamps: false,
            tableName: 'stack'
        } );

    return Stack;
};
