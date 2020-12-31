import axios from 'axios';

export const addUser = (username, password) => {
    return axios.post('/api/user/register', {
        username,
        password
    });
};

export const signInUser = (username, password) => {
    return axios.post('/api/user/signin', {
        username,
        password
    });
};
