const mongoose = require('mongoose');

const { Schema, Decimal128 } = mongoose;

const userRatingSchema = new mongoose.Schema({
    rating: { type: Number, require: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' }
});

const ratingSchema = new mongoose.Schema({
    movie: { type: Schema.Types.ObjectId, ref: 'Movie' },
    rating: { type: Number, require: true },
    avgRating: { type: Decimal128, require: true },
    userRatings: [userRatingSchema]
});

module.exports = mongoose.model('Rating', ratingSchema);
