module.exports = function (sequelize, DataTypes) {
    var Landing = sequelize.define("Landing", {
        id: {
            type: DataTypes.STRING,
            unique: true,
            primaryKey: true,
            allowNull: false
        },
        full_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            allowNull: true
        },
    });

    Landing.associate = function (models) {
        Landing.belongsTo(models.Location);
    };

    return Landing;
};
