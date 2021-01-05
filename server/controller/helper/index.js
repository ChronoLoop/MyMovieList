const Genre = require('../../model/genre');
const User = require('../../model/user');

exports.addGenre = async (genreName) => {
    // add new genre if genre does not exist
    const genre = await Genre.findOne({ genre: genreName });
    if (!genre) {
        const newGenre = new Genre({
            genre: genreName
        });
        newGenre.save();
    }
};
exports.deleteGenre = async (genreName) => {
    const filter = { genre: genreName };
    await Genre.findOneAndDelete(filter);
};

exports.updateGenre = async (prevGenreName, newGenreName) => {
    const filter = { genre: prevGenreName.toLowerCase() };
    const update = { genre: newGenreName.toLowerCase() };
    await Genre.findOneAndUpdate(filter, update, { useFindAndModify: false });
};

exports.isAdmin = async (userId) => {
    const admin = await User.findOneAdminById(userId);
    if (admin) {
        return true;
    }
    return false;
};
