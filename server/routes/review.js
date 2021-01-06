const express = require('express');
const { addReview, getUserRating } = require('../controller/review');

const router = express.Router();

router.post('/new', addReview);
router.get('/:id', getUserRating);

module.exports = router;
