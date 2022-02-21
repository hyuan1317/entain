import raceApi, { RaceInfo, RaceCategoryId } from '../services/raceApi';
import { AppThunk } from '../store';

export const UPDATE_RACE_LIST = 'UPDATE_RACE_LIST';
export const TOGGLE_RACE_CATEGORY = 'TOGGLE_RACE_CATEGORY';
export const UPDATE_SELECTED_RACE_CATEGORY_IDS =
  'UPDATE_SELECTED_RACE_CATEGORY_IDS';

export const updateRaceList = (raceList: RaceInfo[]) =>
  ({
    type: UPDATE_RACE_LIST,
    payload: raceList,
  } as const);

export const updateSelectedRaceCategoryIds = (ids: { [id: string]: boolean }) =>
  ({
    type: UPDATE_SELECTED_RACE_CATEGORY_IDS,
    payload: ids,
  } as const);

export const toggleRaceCategory =
  (raceCategoryId: RaceCategoryId): AppThunk =>
  (dispatch, getState) => {
    const { selectedRaceCategoryIds } = getState().race;
    let newSelectedRaceCategoryIds = { ...selectedRaceCategoryIds };

    newSelectedRaceCategoryIds[raceCategoryId] =
      !newSelectedRaceCategoryIds[raceCategoryId];
    dispatch(updateSelectedRaceCategoryIds(newSelectedRaceCategoryIds));
  };

export const getNextRaceList = (): AppThunk => async dispatch => {
  const response = await raceApi.getNextRaceList(5);
  const { next_to_go_ids, race_summaries } = response;

  const raceInOrder: RaceInfo[] = [];
  next_to_go_ids.forEach(id => raceInOrder.push(race_summaries[id]));

  dispatch(updateRaceList(raceInOrder));
};

export type ActionTypes =
  | ReturnType<typeof updateRaceList>
  | ReturnType<typeof updateSelectedRaceCategoryIds>;
