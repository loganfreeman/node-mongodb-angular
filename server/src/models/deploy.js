module.exports = function(sequelize, DataTypes) {
    var Deploy = sequelize.define( 'Deploy', {
        deploy_date: DataTypes.DATE,
        user_id: DataTypes.INTEGER,
        comments: DataTypes.STRING,
        instance_id: DataTypes.INTEGER

    }, {
            paranoid: false,
            timestamps: false,
            tableName: 'deploy'
        } );

    return Deploy;
};
