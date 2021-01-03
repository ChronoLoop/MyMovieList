import axios from 'axios';

const toTitleCase = (str) => {
    return str
        .toLowerCase()
        .split(' ')
        .map((s) => {
            //capitalize first letter of words adjacent to dashes
            const words = s
                .split('-')
                .map((w) => w.charAt(0).toUpperCase() + w.substring(1))
                .join('-');
            return words;
        })
        .join(' ');
};

export const addMovie = (movie) => {
    const contentType = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    };
    const formData = new FormData();
    formData.append('title', toTitleCase(movie.title));
    formData.append('genre', toTitleCase(movie.genre));
    formData.append('trailerLink', movie.trailerLink);
    formData.append('hours', movie.hours);
    formData.append('minutes', movie.minutes);
    formData.append('description', movie.description);
    formData.append('image', movie.image);
    return axios.post('/api/movies/new', formData, contentType);
};

export const getMovies = () => {
    return axios.get('/api/movies');
};
