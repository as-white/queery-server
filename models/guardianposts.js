module.exports = (sequelize, DataTypes) => {
    const InfoThree = sequelize.define('guardianpost', {
        firstname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
    return InfoThree;
} 