import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
});

api.defaults.headers.common.Authorization = `Bearer ${process.env.TMDB_TOKEN}`;

export default api;
