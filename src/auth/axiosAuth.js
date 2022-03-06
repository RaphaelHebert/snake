import axios from 'axios';

export const axiosWithAuth =() => {
    const token = localStorage.getItem('token');

    return axios.create({
        headers: {
            Authorization: token, //Authorization: `Bearer ${token}`,depending on the api
        },
    });
};