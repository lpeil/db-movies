import axios from 'axios';

const api = axios.create({
  baseURL: process.env.TMDB_URL,
});

api.defaults.headers.common.Authorization = `Bearer ${process.env.TMDB_TOKEN}`;
api.defaults.params = {};
api.defaults.params.language = 'pt-BR';

export default api;
