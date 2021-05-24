const initialState = [];

export default function series(state = initialState, action) {
  switch (action.type) {
    case '@series/ADD_MORE':
      return state.concat(action.series);
    case '@series/CLEAR':
      return [];
    default:
      return state;
  }
}
