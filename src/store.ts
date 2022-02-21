import { applyMiddleware, createStore, Action } from 'redux';
import thunkMiddleware, { ThunkAction } from 'redux-thunk';
import rootReducer, { RootState } from './reducers';

const preloadedState = {};

const middlewares = [thunkMiddleware];
const middlewareEnhancer = applyMiddleware(...middlewares);

const store = createStore(rootReducer, preloadedState, middlewareEnhancer);

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

export default store;
