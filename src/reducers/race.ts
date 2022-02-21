import {
  ActionTypes,
  UPDATE_RACE_LIST,
  UPDATE_SELECTED_RACE_CATEGORY_IDS,
} from '../actions/race';
import { RaceInfo } from '../services/raceApi';

interface IState {
  raceList: RaceInfo[];
  selectedRaceCategoryIds: {
    [id: string]: boolean;
  };
}

const initialState: IState = {
  raceList: [],
  selectedRaceCategoryIds: {},
};

const raceReducer = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    case UPDATE_RACE_LIST:
      return {
        ...state,
        raceList: action.payload,
      };
    case UPDATE_SELECTED_RACE_CATEGORY_IDS:
      return {
        ...state,
        selectedRaceCategoryIds: action.payload,
      };
    default:
      return state;
  }
};

export default raceReducer;
