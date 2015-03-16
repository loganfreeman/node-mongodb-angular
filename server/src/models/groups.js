module.exports = function(sequelize, DataTypes) {
    var Group = sequelize.define( 'Group', {
        description: DataTypes.STRING,
        name: DataTypes.STRING

    }, {
            paranoid: false,
            timestamps: false,
            tableName: 'groups'
        } );

    return Group;
};
