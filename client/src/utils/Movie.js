export const getMovieImage = (data, contentType) => {
    const encodedImage = new Buffer.from(data, 'binary').toString('base64');
    const movieImage = `data:${contentType};base64,` + encodedImage;
    return movieImage;
};
