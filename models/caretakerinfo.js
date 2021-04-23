module.exports = (sequelize, DataTypes) => {
    const Info = sequelize.define('info', {
        // firstname: req.body.firstname,
        // lastname: req.body.lastname,
        // photourl: req.body.photourl,
        // citylocation: req.body.citylocation,
        // statelocation: req.body.statelocation,
        // bio: req.body.description,
        // age: req.body.age,
        // yearsofexperience: req.body.experience,
        // preferredage: req.body.preferredage,
        // distancewilling: req.body.distancewilling,
        // ownerid: req.user.id
        
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
    return Info;
} 