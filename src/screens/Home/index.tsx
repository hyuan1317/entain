import React, { FC, useEffect, useMemo } from 'react';
import styled from 'styled-components/native';
import { useSelector, useDispatch } from 'react-redux';
import { FlatList } from 'react-native';
import { RootState } from '../../reducers';
import { getNextRaceList } from '../../actions/race';
import RaceCard from './RaceCard';
import { RaceInfo } from '../../services/raceApi';
import CategoryFilter from './CategoryFilter';

const Wrapper = styled.View`
  flex: 1;
  padding: 0 20px;
`;
const Title = styled.Text`
  text-align: center;
  font-size: 32px;
  font-weight: 600;
`;

const Home: FC = () => {
  const dispatch = useDispatch();
  const { raceList, selectedRaceCategoryIds } = useSelector(
    (state: RootState) => state.race,
  );

  useEffect(() => {
    dispatch(getNextRaceList());
  }, [dispatch]);

  // fetch api 1 minute past the start time
  useEffect(() => {
    if (raceList.length === 0) {
      return;
    }

    const mostRecentRace = raceList[0];
    const {
      advertised_start: { seconds },
    } = mostRecentRace;

    const now = new Date().getTime() / 1000;
    const triggerTimeRemaining = seconds + 60 - now;

    const fetchCounter = setTimeout(() => {
      dispatch(getNextRaceList());
    }, triggerTimeRemaining * 1000);

    return () => clearTimeout(fetchCounter);
  }, [raceList, dispatch]);

  const displayingRaceList = useMemo(() => {
    // none of categories are selected -> show all
    if (Object.values(selectedRaceCategoryIds).every(v => !v)) {
      return raceList;
    } else {
      return raceList.filter(race => selectedRaceCategoryIds[race.category_id]);
    }
  }, [raceList, selectedRaceCategoryIds]);

  return (
    <Wrapper>
      <Title>Next to go</Title>
      <CategoryFilter />
      <FlatList
        data={displayingRaceList}
        keyExtractor={(item: RaceInfo) => item.race_id}
        renderItem={({ item }: { item: RaceInfo }) => <RaceCard race={item} />}
      />
    </Wrapper>
  );
};

export default Home;
