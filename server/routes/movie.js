const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { addMovie, getMovies, getMovieById } = require('../controller/movie');

// store images in client/public
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const imageDir = path.join(__dirname, '..', '..', 'client/public/uploads');
        fs.access(imageDir, (err) => {
            if (err) {
                return fs.mkdir(imageDir, (error) => cb(error, imageDir));
            }
            return cb(null, imageDir);
        });
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage });
const router = express.Router();

router.post('/new', upload.single('image'), addMovie);
router.get('/', getMovies);
router.get('/:id', getMovieById);
module.exports = router;
