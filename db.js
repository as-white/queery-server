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


const UserTwo = sequelize.import('./models/usercaretaker');
const CaretakerInfo = sequelize.import('./models/caretakerinfo');
UserTwo.hasOne(CaretakerInfo)
CaretakerInfo.belongsTo(UserTwo)

module.exports = {
    UserTwo,
    CaretakerInfo,
  };
  

module.exports = sequelize;