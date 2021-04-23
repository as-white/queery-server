const router = require('express').Router();
const Sequelize = require('../db');
const UserOne = require('../db').import('../models/userclient');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validateSession = require ('../middleware/validate-session');

router.post('/signup', function (req, res) {
    UserOne.create({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 13),
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        role: req.body.role
    })
    .then(
        function createSuccess(userclient) {
           let token = jwt.sign({id: userclient.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});

            res.json({
                user: userclient,
                message: "User successfully registered!",
                sessionToken: token
            });
        }
    )
    .catch(err => res.status(500).json({ error: err }));
});

router.post('/login', function (req, res) {
    UserOne.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(
        function loginSuccess(userclient) {
            if(userclient) {
                bcrypt.compare(req.body.password, userclient.password, function (err, matches) {
                    if (matches) {
                        let token = jwt.sign({id: userclient.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});

                        res.status(200).json({
                            user: userclient,
                            message: "User login successful!",
                            sessionToken: token
                        })

                    } else {
                        res.status(502).send({ error: 'Login Failed' });
                    };
                }); 
            } else {
                res.status(500).json({ error: 'User does not exist.' })
            };
        })
    .catch(err => res.status(500).json({error: err}));
})


router.get('/guardians', function (req, res) {
    UserOne.findAll()
    .then(userclients => res.status(200).json(userclients))
    .catch(err => res.status(500).json({ error: err }));
})


router.get('/byid/:id', function (req, res) {
    UserOne.findOne({
        where: {id: req.params.id }
    })
    .then(userclient => res.status(200).json(userclient))
    .catch(err => res.status(500).json({ error: err}));
})

// Get all users
router.get('/currentguardian', validateSession, function (req, res) {
    // console.log(req.userclient.id);
    UserOne.findOne({
        where: { id: req.userclient.id }
    })
    .then(userclient => res.status(200).json(userclient))
    .catch(err => res.status(500).json({ error: err }));
})



module.exports = router;