module.exports = function(sequelize, DataTypes) {
    var StackAssoc = sequelize.define( 'StackAssoc', {
        stack_id: DataTypes.STRING,
        environment_id: DataTypes.STRING

    }, {
            paranoid: false,
            timestamps: false,
            tableName: 'stack_association'
        } );

    return StackAssoc;
};
