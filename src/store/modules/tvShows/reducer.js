const initialState = [];

export default function tv(state = initialState, action) {
  switch (action.type) {
    case '@tvShows/ADD_MORE':
      return state.concat(action.tvShows);
    case '@tvShows/CLEAR':
      return [];
    default:
      return state;
  }
}
