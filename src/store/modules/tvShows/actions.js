export function addMoreTvShows(tvShows) {
  return {
    type: '@tvShows/ADD_MORE',
    tvShows,
  };
}

export function clearTvShows() {
  return {
    type: '@tvShows/CLEAR',
  };
}
