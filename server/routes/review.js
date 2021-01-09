const express = require('express');
const { addReview, getCurrentUserReview, getMovieReviews } = require('../controller/review');

const router = express.Router();

router.post('/new', addReview);
router.get('/user/:id', getCurrentUserReview);
router.get('/:id', getMovieReviews);

module.exports = router;
