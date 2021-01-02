const mongoose = require('mongoose');

const movieLengthSchema = new mongoose.Schema({
    _id: false,
    hours: { type: Number, require: true },
    minutes: { type: Number, require: true }
});

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    genre: { type: String, required: true },
    trailerLink: { type: String, required: true },
    movieLength: movieLengthSchema,
    description: { type: String, required: true },
    image: { data: Buffer, contentType: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Movie', movieSchema);
