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
  const response = await raceApi.getNextRaceList(10);
  const { next_to_go_ids, race_summaries } = response;

  const raceInOrder: RaceInfo[] = [];
  next_to_go_ids.forEach(id => {
    const {
      advertised_start: { seconds },
    } = race_summaries[id];
    const now = new Date().getTime() / 1000;

    // show race thats not 1 minute past the start time only
    if (seconds + 60 >= now) {
      raceInOrder.push(race_summaries[id]);
    }
  });

  const displayingRaceList = raceInOrder.slice(0, 5);
  dispatch(updateRaceList(displayingRaceList));
};

export type ActionTypes =
  | ReturnType<typeof updateRaceList>
  | ReturnType<typeof updateSelectedRaceCategoryIds>;
