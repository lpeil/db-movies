export function addMoreSeries(series) {
  return {
    type: '@series/ADD_MORE',
    series,
  };
}

export function clearSeries() {
  return {
    type: '@series/CLEAR',
  };
}
