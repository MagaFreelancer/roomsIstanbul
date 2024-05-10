import axios from 'axios';

const instance = axios.create({
    baseURL: `https://0175150936641c7d.mokky.dev`,
});

instance.interceptors.request.use((config) => {
    config.headers.Authorization = window.localStorage.getItem('token');
    return config;
});

export default instance;