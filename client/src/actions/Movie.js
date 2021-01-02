import axios from 'axios';

export const addMovie = (movie) => {
    const contentType = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    };
    const formData = new FormData();
    formData.append('title', movie.title);
    formData.append('genre', movie.genre);
    formData.append('trailerLink', movie.trailerLink);
    formData.append('hours', movie.hours);
    formData.append('minutes', movie.minutes);
    formData.append('description', movie.description);
    formData.append('image', movie.image);
    return axios.post('/api/movie/new', formData, contentType);
};
