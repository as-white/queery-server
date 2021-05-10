const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    // dialectOptions: {
    //     ssl: {
    //         require: true,
    //         rejectUnauthorized: false,
    //     },
    // },
});

sequelize.authenticate().then(
    function() {
        console.log('Connected to queery database.');
    },
    function(err) {
        console.log(err);
    }
);


const User = sequelize.import('./models/users');
const CaretakerInfo = sequelize.import('./models/caretakerinfo');
const GuardianInfo = sequelize.import('./models/guardianinfo');
const GuardianPosts = sequelize.import('./models/guardianposts')
User.hasOne(CaretakerInfo)
CaretakerInfo.belongsTo(User)
User.hasOne(GuardianInfo)
User.hasMany(GuardianPosts)
GuardianInfo.belongsTo(User)
GuardianPosts.belongsTo(User)

module.exports = {
    User,
    CaretakerInfo,
    GuardianInfo,
  };
  

module.exports = sequelize;