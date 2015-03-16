module.exports = function(sequelize, DataTypes) {
    var Environment = sequelize.define( 'Environment', {
        description: DataTypes.STRING,
        name: DataTypes.STRING

    }, {
            paranoid: false,
            timestamps: false,
            tableName: 'environment'
        } );

    return Environment;
};
