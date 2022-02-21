import axios from 'axios';
import keysToCamel from '../utils/keysToCamel';

interface IRaceApi {
  getNextRaceList: (num: number) => Promise<NextToGoData>;
}

export interface NextToGoData {
  nextToGoIds: string[];
  raceSummaries: RaceSummary;
}

export enum RaceCategoryId {
  GREYHOUND = '9daef0d7-bf3c-4f50-921d-8e818c60fe61',
  HARNESS = '161d9be2-e909-4326-8c2c-35ed71fb460b',
  Horse = '4a2788f8-e825-4d36-9894-efd4baf1cfae',
}

interface RaceSummary {
  [raceId: string]: RaceInfo;
}

export interface RaceInfo {
  raceId: string;
  raceName: string;
  raceNumber: number;
  meetingId: string;
  meetingName: string;
  categoryId: RaceCategoryId;
  advertisedStart: {
    seconds: number;
  };
  raceForm: {
    distance: number;
    distanceType: {
      id: string;
      name: string;
      shortName: string;
    };
    distanceTypeId: string;
    trackCondition: {
      id: string;
      name: string;
      shortName: string;
    };
    trackConditionId: string;
    weather: {
      id: string;
      name: string;
      shortName: string;
      iconUri: string;
    };
    weatherId: string;
    raceComment: string;
    additionalData: string;
    generated: number;
    silkBaseUrl: string;
    raceCommentAlternative: string;
  };
  venueId: string;
  venueName: string;
  venueState: string;
  venueCountry: string;
}

const raceApi: IRaceApi = {
  getNextRaceList: async num => {
    const response = await axios.get(
      `https://api.neds.com.au/rest/v1/racing/?method=nextraces&count=${num}`,
    );
    const raceList = keysToCamel(response.data);
    return raceList;
  },
};

export default raceApi;
