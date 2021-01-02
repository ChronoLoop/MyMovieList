const fs = require('fs');
const Movie = require('../model/movie');

const imageMimeTypes = ['image/png', 'image/jpeg', 'image/jpg'];

function validMimeType(mimetype) {
    if (mimetype === null) {
        return false;
    }
    if (imageMimeTypes.includes(mimetype)) {
        return true;
    }
    return false;
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
                        res.status(201).send();
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
