const fs = require('fs');
const Movie = require('../model/movie');
const { addGenre } = require('./helper/index.js');

const IMAGE_MIMETYPES = ['image/png', 'image/jpeg', 'image/jpg'];

// helpers
function validMimeType(mimetype) {
    if (mimetype === null) {
        return false;
    }
    if (IMAGE_MIMETYPES.includes(mimetype)) {
        return true;
    }
    return false;
}
function getMovieFilter(searchQuery, genre, rating) {
    const filter = {
        title: searchQuery,
        genre,
        avgRating: {
            $gte: parseFloat(rating)
        }
    };
    if (genre === 'All') {
        delete filter.genre;
    }
    if (parseFloat(rating) <= 0) {
        delete filter.avgRating;
    }
    if (searchQuery.length <= 0) {
        delete filter.title;
    } else {
        filter.title = new RegExp(`^${searchQuery}`);
    }
    return filter;
}

exports.addMovie = async (req, res) => {
    try {
        fs.readFile(req.file.path, (err, data) => {
            if (err) throw err;
            if (validMimeType(req.file.mimetype) !== true) {
                res.status(400).send();
            } else {
                const contentType = req.file.mimetype;
                const newMovie = new Movie({
                    title: req.body.title,
                    genre: req.body.genre,
                    trailerLink: req.body.trailerLink,
                    movieLength: {
                        hours: req.body.hours,
                        minutes: req.body.minutes
                    },
                    description: req.body.description,
                    image: { data, contentType }
                });
                // save new movie in db
                newMovie.save((dbErr) => {
                    if (dbErr) {
                        res.status(500).send();
                    } else {
                        // add genre to db
                        addGenre(newMovie.genre);
                        res.status(201).json({ movieID: newMovie.id });
                    }
                });
            }
        });
        // delete movie image after saving movie to db
        fs.unlink(req.file.path, (fsError) => {
            if (fsError) throw fsError;
        });
    } catch (err) {
        res.status(500).send();
    }
};

exports.getMovieById = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        res.status(200).json({
            movie
        });
    } catch {
        res.status(500).send();
    }
};

exports.getMovies = async (req, res) => {
    try {
        const { searchQuery, genre, rating } = req.query;
        const filter = getMovieFilter(searchQuery, genre, rating);
        const movies = await Movie.find(filter);
        res.status(200).json({ movies });
    } catch {
        res.status(500).send();
    }
};
