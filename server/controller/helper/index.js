const Genre = require('../../model/genre');

exports.addGenre = async (genreName) => {
    // add new genre if genre does not exist
    const genre = await Genre.findOne({ genre: genreName.toLowerCase() });
    if (!genre) {
        const newGenre = new Genre({
            genre: genreName
        });
        newGenre.save();
    }
};
exports.deleteGenre = async (genreName) => {
    const filter = { genre: genreName.toLowerCase() };
    await Genre.findOneAndDelete(filter);
};

exports.updateGenre = async (prevGenreName, newGenreName) => {
    const filter = { genre: prevGenreName.toLowerCase() };
    const update = { genre: newGenreName.toLowerCase() };
    await Genre.findOneAndUpdate(filter, update, { useFindAndModify: false });
};
