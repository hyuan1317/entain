import { combineReducers } from 'redux';
import raceReducer from './race';

const rootReducer = combineReducers({
  race: raceReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
