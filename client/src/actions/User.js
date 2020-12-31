import axios from 'axios';

export const addUser = (username, password) => {
    return axios.post('/api/user/register', {
        username: username,
        password: password
    });
};
