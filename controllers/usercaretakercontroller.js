const router = require('express').Router();
const Sequelize = require('../db');
const UserTwo = require('../db').import('../models/usercaretaker');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validateSession = require ('../middleware/validate-session');

router.post('/signup', function (req, res) {
    UserTwo.create({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 13),
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        role: req.body.role
    })
    .then(
        function createSuccess(usercaretaker) {
           let token = jwt.sign({id: usercaretaker.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});

            res.json({
                user: usercaretaker,
                message: "User successfully registered!",
                sessionToken: token
            });
        }
    )
    .catch(err => res.status(500).json({ error: err }));
});

router.post('/login', function (req, res) {
    UserTwo.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(
        function loginSuccess(usercaretaker) {
            if(usercaretaker) {
                bcrypt.compare(req.body.password, usercaretaker.password, function (err, matches) {
                    if (matches) {
                        let token = jwt.sign({id: usercaretaker.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});

                        res.status(200).json({
                            user: usercaretaker,
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


router.get('/caretakers', function (req, res) {
    UserTwo.findAll()
    .then(usercaretakers => res.status(200).json(usercaretakers))
    .catch(err => res.status(500).json({ error: err }));
})


router.get('/byid/:id', function (req, res) {
    UserTwo.findOne({
        where: {id: req.params.id }
    })
    .then(usercaretaker => res.status(200).json(usercaretaker))
    .catch(err => res.status(500).json({ error: err}));
})

// Get all users
router.get('/currentcaretaker', validateSession, function (req, res) {
    // console.log(req.user.id);
    UserTwo.findOne({
        where: { id: req.user.id }
    })
    .then(usercaretaker => res.status(200).json(usercaretaker))
    .catch(err => res.status(500).json({ error: err }));
})



module.exports = router;