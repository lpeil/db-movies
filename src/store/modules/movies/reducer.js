const initialState = [];

export default function movies(state = initialState, action) {
  switch (action.type) {
    case '@movies/ADD_MORE':
      return state.concat(action.movies);
    case '@movies/CLEAR':
      return [];
    default:
      return state;
  }
}
