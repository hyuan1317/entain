import React, { FC, useCallback } from 'react';
import styled from 'styled-components/native';
import { useSelector, useDispatch } from 'react-redux';
import { FlatList } from 'react-native';
import { toggleRaceCategory } from '../../actions/race';
import { raceCategoryId, RaceCategoryType } from '../../services/raceApi';
import { RootState } from '../../reducers';

const Wrapper = styled.View`
  flex-direction: row;
  margin: 20px 0;
`;
const CategoryButton = styled.TouchableOpacity<{ isActive: boolean }>`
  padding: 10px;
  border-width: 2px;
  border-color: #0073b1;
  margin-right: 15px;
  border-radius: 2px;
  background-color: ${({ isActive }) => (isActive ? '#0073b1' : 'transparent')};
`;
const CategoryText = styled.Text<{ isActive: boolean }>`
  font-size: 14px;
  font-weight: 600;
  color: ${({ isActive }) => (isActive ? '#ffffff' : 'black')};
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
              onPress={() => handleOnPress(categoryId)}>
              <CategoryText isActive={isActive}>{item}</CategoryText>
            </CategoryButton>
          );
        }}
      />
    </Wrapper>
  );
};

export default CategoryFilter;
