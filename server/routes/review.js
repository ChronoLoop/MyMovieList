const express = require('express');
const { addReview, getCurrentUserReview, getMovieReviews } = require('../controller/review');

const router = express.Router();

router.post('/new', addReview);
router.get('/user/:id', getCurrentUserReview);
router.get('/movie/:id', getMovieReviews);

module.exports = router;
