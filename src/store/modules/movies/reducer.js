const initialState = [];

export default function movies(state = initialState, action) {
  switch (action.type) {
    case '@movies/ADD_MORE':
      state.concat(action.movies);

      return state;
    case '@movies/CLEAR':
      return [];
    default:
      return state;
  }
}
