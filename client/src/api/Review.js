import axios from 'axios';

export const addReview = (movieId, rating, review) => {
    return axios.post('/api/review/new', {
        movie: movieId,
        review,
        rating
    });
};

export const getReviews = (movieId) => {
    return axios.get(`/api/review/${movieId}`);
};

export const getUserReview = (movieId) => {
    return axios.get(`/api/review/user/${movieId}`);
};
