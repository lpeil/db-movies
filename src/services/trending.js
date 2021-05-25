import api from './api';
import i18n from '../i18n';

export const apiGetTrending = (page = 1, type = 'movie', period = 'week') => (
  api.get(`/trending/${type}/${period}?page=${page}&language=${i18n.language}`).then((response) => response.data)
);
