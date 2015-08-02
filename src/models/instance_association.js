module.exports = function(sequelize, DataTypes) {
    var InstanceAssoc = sequelize.define( 'InstanceAssoc', {
        instance_id: DataTypes.INTEGER,
        stack_id: DataTypes.INTEGER

    }, {
            paranoid: false,
            timestamps: false,
            tableName: 'instance_association'
        } );

    return InstanceAssoc;
};
