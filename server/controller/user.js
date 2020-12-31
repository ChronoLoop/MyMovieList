const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../model/user');

exports.addUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const existingUser = await User.findOneByUsername(username);
        if (existingUser) {
            // if user name already exists send error
            res.status(409).json({ userExists: true });
        } else {
            // create new user with hashed password
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({
                username,
                password: hashedPassword
            });
            await newUser.save();
            res.status(201).send();
        }
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
};

exports.signInUser = (req, res, next) => {
    passport.authenticate('local', (err, user) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(400).send({ incorrectCredentials: true });
        }
        req.login(user, (error) => {
            if (error) {
                return next(error);
            }
            return res.status(200).send();
        });
        return res.status(200).send();
    })(req, res, next);
};

exports.signOutUser = async (req, res) => {
    req.logout();
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send();
        }
        return res.clearCookie('connect.sid').status(200).send();
    });
};

exports.checkUserAuth = async (req, res) => {
    if (req.isAuthenticated()) {
        return res.status(200).send({ auth: true, userID: req.user._id });
    }
    return res.status(401).send();
};
