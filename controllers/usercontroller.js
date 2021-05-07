const router = require('express').Router();
const Sequelize = require('../db');
const User = require('../db').import('../models/users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validateSession = require ('../middleware/validate-session');

router.post('/signup', function (req, res) {
    User.create({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 13),
        role: req.body.role
    })
    .then(
        function createSuccess(user) {
           let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});

            res.status(200).json({
                user: user,
                message: "User successfully registered!",
                sessionToken: token,
                role: user.role
            });
        }
    )
    .catch(err => res.status(500).json({ error: err }));
});

router.post('/login', function (req, res) {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(
        function loginSuccess(user) {
            if(user) {
                bcrypt.compare(req.body.password, user.password, function (err, matches) {
                    if (matches) {
                        let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});

                        res.status(200).json({
                            user: user,
                            message: "User login successful!",
                            sessionToken: token,
                            role: user.role
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

// router.post("/login", (req, res) => {
//     User.findOne({ where: { email: req.body.email } }).then((user) => {
//         if (user) {
//             bcrypt.compare(req.body.password, user.password, function (
//                 err,
//                 matches
//             ) {
//                 if (matches) {
//                     var token = jwt.sign({ id: user.id }, "secret", {
//                         expiresIn: 60 * 60 * 24,
//                     });
//                     res.status(200).json({
//                         user: user, 
//                         message: "Login successful.",
//                         sessionToken: token,
//                     });
//                 } else {
//                     res.status(502).send({ error: "Bad gateway." });
//                 }
//             });
//         } else {
//             res.status(403).send({ error: "User not found." });
//         }
//     });
// });

router.get('/guardians', function (req, res) {
    User.findAll()
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).json({ error: err }));
})


router.get('/byid/:id', function (req, res) {
    User.findOne({
        where: {id: req.params.id }
    })
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).json({ error: err}));
})

// Get all users
router.get('/currentguardian', validateSession, function (req, res) {
    // console.log(req.user.id);
    User.findOne({
        where: { id: req.user.id }
    })
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).json({ error: err }));
})



module.exports = router;