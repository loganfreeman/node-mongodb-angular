module.exports = function(sequelize, DataTypes) {
    var UserGroupAssoc = sequelize.define( 'UserGroupAssoc', {
        group_id: DataTypes.INTEGER,
        user_id: DataTypes.INTEGER

    }, {
            paranoid: false,
            timestamps: false,
            tableName: 'user_group'
        } );

    return UserGroupAssoc;
};
