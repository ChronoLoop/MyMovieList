const mongoose = require('mongoose');

// const movieRatingSchema = new mongoose.Schema({
//     _id: false,
//     ratingValue: { type: Double, default: undefined },
//     totalRating: { type: Number, default: 0 },
//     numberOfRatings: { type: Number, default: 0 }
// });

const movieLengthSchema = new mongoose.Schema({
    _id: false,
    hours: { type: Number, require: true },
    minutes: { type: Number, require: true }
});

const movieSchema = new mongoose.Schema({
    title: { type: String, trim: true, required: true },
    genre: { type: String, trim: true, required: true },
    trailerLink: { type: String, trim: true, required: true },
    movieLength: movieLengthSchema,
    description: { type: String, trim: true, required: true },
    image: { data: Buffer, contentType: String },
    avgRating: { type: Number, default: null },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Movie', movieSchema);
