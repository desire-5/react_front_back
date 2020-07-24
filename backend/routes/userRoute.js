import express from 'express';
import User from '../models/userModel';
import { getToken } from '../util';

const router = express.Router();

router.post('/register', async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });
    const newUser = await user.save();
    if (newUser) {
        res.send({
            _id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            token: getToken(newUser),
        });
    } else {
        res.status(401).send({ message: 'Invalid User Data.' });
    }
});
router.post('/signin', async (req, res) => {
    try {
        const signinUser = await User.findOne({
            password: req.body.password,
            email: req.body.email,
        });
        if (signinUser) {
            res.send({
                _id: signinUser.id,
                name: signinUser.name,
                email: signinUser.email,
                isAdmin: signinUser.isAdmin,
                token: getToken(signinUser),
            });
        } else {
            res.status(401).send({ msg: 'email or name is wrong' });
        }
    } catch (error) {
        res.send({ msg: error.message });
    }
});

router.get('/createadmin', async (req, res) => {
    try {
        const user = new User({
            name: 'desire',
            email: 'ant23james233@gmail.com',
            password: '123',
            isAdmin: true,
        });
        const newUser = await user.save();
        res.send(newUser);
    } catch (error) {
        res.send({ msg: error.message });
    }
});

// router.post('/createadmin', async (req, res) => {
//     try {
//         const user = new User({
//             name: req.body.name,
//             email: req.body.email,
//             password: req.body.password,
//             isAdmin: req.body.isAdmin,
//         });
//         const newUser = await user.save();
//         res.send(newUser);
//     } catch (error) {
//         res.send({ msg: error.message });
//     }
// });

export default router;
