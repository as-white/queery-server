let express = require('express');
const Sequelize = require('../db');
const InfoTwo = require('../db').import('../models/caretakerinfo');
const router = express.Router();
const validateSession = require ('../middleware/validate-session');

router.get('/', validateSession, (req, res) => {
    InfoTwo.findAll()
        .then(infos => res.status(200).json(infos))
        .catch(err => res.status(500).json({error: err}))
});

router.get('/mine', validateSession, (req, res) => {
    InfoTwo.findAll({
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
        photourl: req.body.photourl,
        citylocation: req.body.citylocation,
        statelocation: req.body.statelocation,
        zipcode: req.body.zipcode,
        street: req.body.street,
        bio: req.body.bio,
        age: req.body.age,
        experience: req.body.experience,
        preferredage: req.body.preferredage,
        distancewilling: req.body.distancewilling,
        userId: req.user.id
    }

    InfoTwo.create(infoEntry)
    .then(info => res.status(200).json(info))
    .catch(err => res.status(500).json({ error: err }));
});


router.get('/:userId', validateSession, function (req, res) {
    InfoTwo.findOne({
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
    InfoTwo.findAll({
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
        photourl: req.body.photourl,
        citylocation: req.body.citylocation,
        statelocation: req.body.statelocation,
        zipcode: req.body.zipcode,
        street: req.body.street,
        bio: req.body.description,
        age: req.body.age,
        experience: req.body.experience,
        preferredage: req.body.preferredage,
        distancewilling: req.body.distancewilling
    };

    const query = {where: { id: req.params.id, userId: req.user.id}};

    InfoTwo.update(updateInfo, query)
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

router.delete('/:id', validateSession, function (req, res) {
    const query = {where: {id: req.params.id, userId: req.user.id}};

    InfoTwo.destroy(query)
    .then(() => res.status(200).json({message: "Profile Removed"}))
    .catch((err) => res.status(500).json({error: err}));
});

router.get('/cloudsign', validateSession, async (req, res) => {
    try {
        const ts = Math.floor(new Date().getTime() / 1000).toString()
        const sig = cloudinary.utils.api_sign_request(
            {timestamp: ts, upload_preset: 'artisan-goods-cloudinary'},
            process.env.CLOUDINARY_SECRET
        )
        res.status(200).json({
            sig, ts
        })
    } catch (err) {
        res.status(500).json({
            message: 'failed to sign'
        })
    }
  })
  router.put('/photourl', validateSession, async (req, res) => {
    try {
        const u = await UserTwo.findOne({where: {id: req.params.id, userId: req.user.id}})
        const result = await u.update({
            avatar: req.body.url
        })
    } catch (err) {
        res.status(500).json({
            message: 'failed to set image'
        })
    }
  })

module.exports = router;
