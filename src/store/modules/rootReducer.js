import { combineReducers } from 'redux';

import movies from './movies/reducer';
import tvShows from './tvShows/reducer';

export default combineReducers({ movies, tvShows });
