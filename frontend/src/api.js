import axios from 'axios';

const isDev = import.meta.env.MODE === "development";

const API = axios.create({
    baseURL: isDev ? 'http://localhost:3000' : import.meta.env.VITE_API_URL,
    withCredentials: false,
});

export default API;