const jwt = require('jsonwebtoken');
const UserTwo = require('../db').import('../models/usercaretaker');

const validateSession = (req, res, next) => {
    const token = req.headers.authorization;
    console.log('token --> ', token);

    if (!token) {
        return res.status(403).send({ auth: false, message: "No token provided." })
    } else {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodeToken) => {
            console.log('decodeToken --> ', decodeToken);
            if (!err && decodeToken) {
                UserTwo.findOne({
                    where: {
                        id: decodeToken.id
                    }
                })
                .then (usercaretaker => {
                    console.log('usercaretaker --> ', usercaretaker);
                    if (!usercaretaker) throw err;
                    console.log('req --> ', req)
                    req.usercaretaker = usercaretaker;
                    return next();
                })
                .catch(err => next(err));
            } else {
                req.errors = err;
                return res.status(500).send('Not Authorized');
            };
        })
    };
};

module.exports = validateSession;