export function addMoreMovies(movies) {
  return {
    type: '@movies/ADD_MORE',
    movies,
  };
}

export function clearMovies() {
  return {
    type: '@movies/CLEAR',
  };
}
