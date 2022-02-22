import React, { FC, useCallback } from 'react';
import styled from 'styled-components/native';
import { useSelector, useDispatch } from 'react-redux';
import { FlatList } from 'react-native';
import CategoryButton from './CategoryButton';
import { toggleRaceCategory } from '../../../actions/race';
import { raceCategoryId, RaceCategoryType } from '../../../services/raceApi';
import { RootState } from '../../../reducers';

const Wrapper = styled.View`
  flex-direction: row;
  margin: 20px 0;
`;

const categoryList = Object.keys(raceCategoryId) as RaceCategoryType[];

const CategoryFilter: FC = () => {
  const dispatch = useDispatch();
  const { selectedRaceCategoryIds } = useSelector(
    (state: RootState) => state.race,
  );

  const handleOnPress = useCallback(
    (categoryId: string) => {
      dispatch(toggleRaceCategory(categoryId));
    },
    [dispatch],
  );

  return (
    <Wrapper>
      <FlatList
        horizontal
        data={categoryList}
        keyExtractor={(item: RaceCategoryType) => item}
        renderItem={({ item }: { item: RaceCategoryType }) => {
          const categoryId = raceCategoryId[item]!;
          const isActive = !!selectedRaceCategoryIds[categoryId];
          return (
            <CategoryButton
              isActive={isActive}
              onPress={() => handleOnPress(categoryId)}
              text={item}
            />
          );
        }}
      />
    </Wrapper>
  );
};

export default CategoryFilter;
