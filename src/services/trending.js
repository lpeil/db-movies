import api from './api';

export const apiGetTrending = (type = 'movie', period = 'week') => (
  api.get(`/trending/${type}/${period}`).then((response) => response.data)
);
