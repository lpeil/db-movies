import api from './api';

export const apiGetMovieById = (id) => (
  api.get(`/movie/${id}`).then((response) => response.data)
);
