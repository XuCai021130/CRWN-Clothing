import { legacy_createStore as createStore, compose, applyMiddleware } from 'redux';
// import logger from 'redux-logger';

import { rootReducer } from './root-reducer';

const ourLoggerMiddleware = (store) => (next) => (action) => {
  if (!action.type) {
    return next(action);
  }

  console.log('type:', action.type);
  console.log('payload:', action.payload);
  console.log('currState:', store.getState());

  next(action);
  console.log('next state:', store.getState());
}
const middleWares = [ourLoggerMiddleware];

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, undefined, composedEnhancers);