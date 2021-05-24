import api from './api';

export const apiGetMovieById = (id) => (
  api.get(`/movie/${id}?append_to_response=recommendations`).then((response) => response.data)
);
