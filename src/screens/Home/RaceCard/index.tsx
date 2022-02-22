import React, { FC, useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { RaceInfo } from '../../../services/raceApi';

interface Props {
  race: RaceInfo;
}

const Wrapper = styled.View`
  width: 100%;
  border-width: 2px;
  border-color: gray;
  margin-bottom: 15px;
  border-radius: 8px;
  padding: 15px;
`;
const Title = styled.Text`
  font-size: 20px;
`;
const Content = styled.Text`
  font-size: 18px;
`;
const FlexRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4px;
`;

interface CountingTimeType {
  min: number;
  sec: number;
}

function formatTimeRemaining(seconds: number) {
  let remainingSecs = seconds - new Date().getTime() / 1000;

  if (remainingSecs <= 0) {
    return {
      min: 0,
      sec: 0,
    };
  }

  const countingInMin = Math.floor(remainingSecs / 60);
  remainingSecs = remainingSecs - countingInMin * 60;
  const countingInSec = Math.floor(remainingSecs);
  return {
    min: countingInMin,
    sec: countingInSec,
  };
}

const RaceCard: FC<Props> = props => {
  const { race } = props;
  const {
    meeting_name,
    race_number,
    advertised_start: { seconds },
  } = race;

  const [countingTime, setCountingTime] = useState<CountingTimeType>(
    formatTimeRemaining(seconds),
  );

  useEffect(() => {
    const counter = setInterval(() => {
      const now = new Date().getTime() / 1000; // milliseconds to seconds
      if (now >= seconds) {
        clearInterval(counter);
      } else {
        const newCountingTime = formatTimeRemaining(seconds);
        setCountingTime(newCountingTime);
      }
    }, 1000);

    return () => clearInterval(counter);
  }, [seconds]);

  return (
    <Wrapper>
      <FlexRow>
        <Title>Meeting Name:</Title>
        <Content>{meeting_name}</Content>
      </FlexRow>
      <FlexRow>
        <Title>Race Number:</Title>
        <Content>{race_number}</Content>
      </FlexRow>
      <FlexRow>
        <Title>Starting in:</Title>
        <Content>{`${countingTime.min}mins ${countingTime.sec}secs `}</Content>
      </FlexRow>
    </Wrapper>
  );
};

export default RaceCard;
