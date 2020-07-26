module.exports = function (sequelize, DataTypes) {
    var Location = sequelize.define("Location", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        region: {
            type: DataTypes.STRING,
            allowNull: true
        },
        latitude: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        longitude: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
    });

    return Location;
};
