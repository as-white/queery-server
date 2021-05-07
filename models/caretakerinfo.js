module.exports = (sequelize, DataTypes) => {
    const InfoTwo = sequelize.define('caretaker', {
        
        firstname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        photourl: {
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
        },
        bio: {
            type: DataTypes.STRING,
            allowNull: false
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        experience: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        preferredage: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        distancewilling: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    })
    return InfoTwo;
} 