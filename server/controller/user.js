const bcrypt = require('bcrypt');
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
