import api from './api';

export const apiGetMovieById = (id) => (
  api.get(`/movie/${id}`).then((response) => response.data)
);

export const apiSearchMovies = (text) => (
  api.get(`/search/movie/?query=${text}`).then((response) => response.data)
);
