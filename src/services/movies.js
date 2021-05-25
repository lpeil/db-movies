import api from './api';
import i18n from '../i18n';

export const apiGetMovieById = (id) => (
  api.get(`/movie/${id}?language=${i18n.language}`).then((response) => response.data)
);

export const apiGetMovieRecommendations = (id) => (
  api.get(`/movie/${id}/recommendations?language=${i18n.language}`).then((response) => response.data)
);

export const apiGetMovieCredits = (id) => (
  api.get(`/movie/${id}/credits?language=${i18n.language}`).then((response) => response.data)
);
