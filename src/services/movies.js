import api from './api';

export const apiGetMovieById = (id) => (
  api.get(`/movie/${id}`).then((response) => response.data)
);

export const apiGetMovieRecommendations = (id) => (
  api.get(`/movie/${id}/recommendations`).then((response) => response.data)
);

export const apiGetMovieCredits = (id) => (
  api.get(`/movie/${id}/credits`).then((response) => response.data)
);
