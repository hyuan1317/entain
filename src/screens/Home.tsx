import React, { FC, useEffect } from 'react';
import styled from 'styled-components/native';
import { useSelector, useDispatch } from 'react-redux';
import { FlatList } from 'react-native';
import { RootState } from '../reducers';
import { getNextRaceList } from '../actions/race';
import RaceCard from '../components/RaceCard';
import { RaceInfo } from '../services/raceApi';

const Wrapper = styled.View`
  flex: 1;
  padding: 0 20px;
`;
const Title = styled.Text`
  text-align: center;
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const Home: FC = () => {
  const dispatch = useDispatch();
  const { raceList } = useSelector((state: RootState) => state.race);

  useEffect(() => {
    dispatch(getNextRaceList());
  }, [dispatch]);

  return (
    <Wrapper>
      <Title>Next to go</Title>
      <FlatList
        data={raceList}
        keyExtractor={(item: RaceInfo) => item.race_id}
        renderItem={({ item }: { item: RaceInfo }) => <RaceCard race={item} />}
      />
    </Wrapper>
  );
};

export default Home;
