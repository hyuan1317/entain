import React, { FC } from 'react';
import styled from 'styled-components/native';

const ButtonWrapper = styled.TouchableOpacity<{ isActive: boolean }>`
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

interface Props {
  text: string;
  isActive: boolean;
  onPress: () => void;
}

const CategoryButton: FC<Props> = props => {
  const { isActive, onPress, text } = props;

  return (
    <ButtonWrapper isActive={isActive} onPress={onPress}>
      <CategoryText isActive={isActive}>{text}</CategoryText>
    </ButtonWrapper>
  );
};

export default CategoryButton;
