module.exports = (sequelize, DataTypes) => {
    const InfoOne = sequelize.define('guardian', {
        firstname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        citylocation: {
            type: DataTypes.STRING,
            allowNull: false
        },
        statelocation: {
            type: DataTypes.STRING,
            allowNull: true
        },
        zipcode: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        street: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
    return InfoOne;
} 