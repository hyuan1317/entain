import React, { FC, useEffect, useMemo } from 'react';
import styled from 'styled-components/native';
import { useSelector, useDispatch } from 'react-redux';
import { FlatList } from 'react-native';
import { RootState } from '../../reducers';
import { getNextRaceList } from '../../actions/race';
import RaceCard from '../../components/RaceCard';
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
