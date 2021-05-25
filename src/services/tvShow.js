import api from './api';

export const apiGetTvById = (id) => (
  api.get(`/tv/${id}`).then((response) => response.data)
);

export const apiGetTvRecommendations = (id) => (
  api.get(`/tv/${id}/recommendations`).then((response) => response.data)
);

export const apiGetTvCredits = (id) => (
  api.get(`/tv/${id}/credits`).then((response) => response.data)
);
