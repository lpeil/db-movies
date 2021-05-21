import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './modules/rootReducer';

const enhancer = process.env.NODE_ENV === 'development'
  ? composeWithDevTools(applyMiddleware())
  : applyMiddleware();

export default createStore(rootReducer, compose(enhancer));
