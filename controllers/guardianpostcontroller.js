let express = require('express');
const Sequelize = require('../db');
const InfoThree = require('../db').import('../models/guardianposts');
const router = express.Router();
const validateSession = require ('../middleware/validate-session');

router.get('/', validateSession, (req, res) => {
    InfoThree.findAll()
        .then(infos => res.status(200).json(infos))
        .catch(err => res.status(500).json({error: err}))
});

router.get('/mine', validateSession, (req, res) => {
    InfoThree.findAll({
        where: { userId: req.user.id }
    })
    .then(infos => {
        res.status(200).json(infos);
    })
    .catch(err => res.status(500).json({ error: err }));
})

router.post('/', validateSession, function (req, res) {
    const postEntry = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        message: req.body.message,
        userId: req.user.id
    }

    InfoThree.create(postEntry)
    .then(info => res.status(200).json(info))
    .catch(err => res.status(500).json({ error: err }));
});


router.get('/:userId', validateSession, function (req, res) {
    InfoThree.findOne({
        where: { userId: req.user.id, id: req.params.id }
    })
    .then(info => res.status(200).json(info))
    .catch(err => res.status(500).json({ error: err }));
});


router.put('/:id', validateSession, function (req, res){
    const updatePost = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        message: req.body.message
    };

    const query = {where: { id: req.params.id, userId: req.user.id}};

    InfoThree.update(updateInfo, query)
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
