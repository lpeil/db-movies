import api from './api';
import i18n from '../i18n';

export const apiSearchMovies = (page, type, text) => (
  api.get(`/search/${type}?query=${text}&page=${page}&language=${i18n.language}`).then((response) => response.data)
);
