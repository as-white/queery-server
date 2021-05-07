let express = require('express');
const Sequelize = require('../db');
const InfoOne = require('../db').import('../models/guardianinfo');
const router = express.Router();
const validateSession = require ('../middleware/validate-session');

router.get('/', validateSession, (req, res) => {
    Info.findAll()
        .then(infos => res.status(200).json(infos))
        .catch(err => res.status(500).json({error: err}))
});

router.get('/mine', validateSession, (req, res) => {
    InfoOne.findAll({
        where: { userId: req.user.id }
    })
    .then(infos => {
        res.status(200).json(infos);
    })
    .catch(err => res.status(500).json({ error: err }));
})

router.post('/', validateSession, function (req, res) {
    const infoEntry = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        citylocation: req.body.citylocation,
        statelocation: req.body.statelocation,
        zipcode: req.body.zipcode,
        street: req.body.street,
        userId: req.user.id
    }

    InfoOne.create(infoEntry)
    .then(info => res.status(200).json(info))
    .catch(err => res.status(500).json({ error: err }));
});


router.get('/:userId', validateSession, function (req, res) {
    Info.findOne({
        where: { userId: req.user.id, id: req.params.id }
    })
    .then(info => res.status(200).json(info))
    .catch(err => res.status(500).json({ error: err }));
});


// router.get('/:id', validateSession, function (req, res) {
//     Info.findOne({
//         where: { id: req.params.id }
//     })
//     .then(info => res.status(200).json(info))
//     .catch(err => res.status(500).json({ error: err }));
// });


router.get('/genderidentity/:genderidentity', validateSession, function (req, res) {
    Info.findAll({
        where: 
            Sequelize.where(
                Sequelize.fn('lower', Sequelize.col('genderidentity')), req.params.gender.toLowerCase())
    })
    .then(info => res.status(200).json(info))
    .catch(err => res.status(500).json({ error: err }));
});

router.put('/:id', validateSession, function (req, res){
    const updateInfo = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        citylocation: req.body.citylocation,
        statelocation: req.body.statelocation,
        zipcode: req.body.zipcode,
        street: req.body.street
    };

    const query = {where: { id: req.params.id, userId: req.user.id}};

    Info.update(updateInfo, query)
    .then(info => res.status(200).json(info))
    .catch(err => res.status(500).json({error:err}))
});

// This one gets by city regardless of owner
router.get('/city/:city', validateSession, function (req, res) {
    Info.findAll({
        where: 
            Sequelize.where(
                Sequelize.fn('lower', Sequelize.col('citylocation')), req.params.city.toLowerCase())
    })
    .then(info => res.status(200).json(info))
    .catch(err => res.status(500).json({ error: err }));
});


router.get('/state/:state', validateSession, function (req, res) {
    Info.findAll({
        where: 
            Sequelize.where(
              Sequelize.fn('lower', Sequelize.col('statelocation')), req.params.state.toLowerCase())
        })
    .then(info => res.status(200).json(info))
    .catch(err => res.status(500).json({ error: err }));
});


module.exports = router;
