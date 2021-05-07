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
const GuardianInfo = sequelize.import('./models/guardianinfo')
User.hasOne(CaretakerInfo)
CaretakerInfo.belongsTo(User)
User.hasOne(GuardianInfo)
GuardianInfo.belongsTo(User)

module.exports = {
    User,
    CaretakerInfo,
    GuardianInfo,
  };
  

module.exports = sequelize;