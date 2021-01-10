const fs = require('fs');
const Movie = require('../model/movie');
const { addGenre, isAdmin, deleteGenre, deleteReviews } = require('./helper/index.js');

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
            // greater than or equal to user's rating
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
        // title that starts with searchQuery string
        filter.title = new RegExp(`^${searchQuery}`);
    }
    return filter;
}

exports.addMovie = async (req, res) => {
    try {
        fs.readFile(req.file.path, async (err, data) => {
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
                await newMovie.save();
                // add genre to db
                await addGenre(newMovie.genre);
                res.status(201).json({ movieID: newMovie.id });
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

exports.deleteMovieById = async (req, res) => {
    try {
        // check if admin
        if (await isAdmin(req.user._id)) {
            const movieId = req.params.id;
            const movie = await Movie.findByIdAndDelete(movieId);
            // Delete genre if there are no movies with this genre
            if (movie) {
                const genreFilter = { genre: movie.genre };
                const movieWithPrevGenre = await Movie.findOne(genreFilter);
                if (!movieWithPrevGenre) {
                    await deleteGenre(movie.genre);
                    await deleteReviews(movieId);
                }
            }
            res.status(204).send();
        } else {
            // unauthorized to delete
            res.status(403).send();
        }
    } catch {
        res.status(500).send();
    }
};
