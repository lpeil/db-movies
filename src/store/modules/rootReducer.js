import { combineReducers } from 'redux';

import movies from './movies/reducer';
import series from './series/reducer';

export default combineReducers({ movies, series });
