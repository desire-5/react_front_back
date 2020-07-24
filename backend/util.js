import jwt from 'jsonwebtoken';
import config from './config';

const getToken = user =>
    jwt.sign(
        {
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        },
        config.JWT_SECRET,
        { expiresIn: '48h' }
    );

const isAuth = (req, res, next) => {
    console.log('isAuth req.headers', req.headers);

    const token = req.headers.autorization;
    if (token) {
        const tokenNumber = token.slice(7, token.length);
        jwt.verify(tokenNumber, config.JWT_SECRET, (err, decode) => {
            if (err) {
                return res.status(401).send({ msg: 'Invalid token' });
            }
            req.user = decode;
            next();
        });
    } else {
        return res.status(401).send({ msg: 'token is not suplied' });
    }
};

const isAdmin = (req, res, next) => {
    console.log('eq.user', req.user);
    if (req.user && req.user.isAdmin) {
        return next();
    }
    return res.status(401).send({ msg: 'Admin token is not valid' });
};
export { getToken, isAuth, isAdmin };
