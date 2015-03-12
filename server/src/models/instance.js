module.exports = function(sequelize, DataTypes) {
    var Instance = sequelize.define( 'Instance', {
        description: DataTypes.STRING,
        name: DataTypes.STRING,
        ip: DataTypes.STRING

    }, {
            paranoid: false,
            timestamps: false,
            tableName: 'instance'
        } );

    return Instance;
};
