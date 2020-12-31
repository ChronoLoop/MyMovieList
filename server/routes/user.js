const express = require('express');
const { addUser } = require('../controller/user');

const router = express.Router();

router.post('/register', addUser);
// router.post('/signin', signInUser);
// router.get('/signout', signOutUser);
// router.get('/checkAuth', checkUserAuth);
module.exports = router;
