import api from './api';

export const apiGetTrending = (page = 1, type = 'movie', period = 'week') => (
  api.get(`/trending/${type}/${period}?page=${page}`).then((response) => response.data)
);
