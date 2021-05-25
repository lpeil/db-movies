import api from './api';
import i18n from '../i18n';

export const apiGetTvById = (id) => (
  api.get(`/tv/${id}?language=${i18n.language}`).then((response) => response.data)
);

export const apiGetTvRecommendations = (id) => (
  api.get(`/tv/${id}/recommendations?language=${i18n.language}`).then((response) => response.data)
);

export const apiGetTvCredits = (id) => (
  api.get(`/tv/${id}/credits?language=${i18n.language}`).then((response) => response.data)
);

export const apiGetTvSeason = (id, season) => (
  api.get(`/tv/${id}/season/${season}?language=${i18n.language}`).then((response) => response.data)
);
