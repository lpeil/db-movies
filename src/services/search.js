import api from './api';

export const apiSearchMovies = (page, type, text) => (
  api.get(`/search/${type}/?query=${text}&page=${page}`).then((response) => response.data)
);
