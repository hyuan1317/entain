import axios from 'axios';

interface IRaceApi {
  getNextRaceList: (num: number) => Promise<NextToGoData>;
}

export interface NextToGoData {
  next_to_go_ids: string[];
  race_summaries: RaceSummary;
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
  race_id: string;
  race_name: string;
  race_number: number;
  meeting_id: string;
  meeting_name: string;
  category_id: RaceCategoryId;
  advertised_start: {
    seconds: number;
  };
  race_form: {
    distance: number;
    distance_type: {
      id: string;
      name: string;
      short_name: string;
    };
    distance_type_id: string;
    track_condition: {
      id: string;
      name: string;
      short_name: string;
    };
    track_condition_id: string;
    weather: {
      id: string;
      name: string;
      short_name: string;
      icon_uri: string;
    };
    weather_id: string;
    race_comment: string;
    additional_data: string;
    generated: number;
    silk_base_url: string;
    race_comment_alternative: string;
  };
  venue_id: string;
  venue_name: string;
  venue_dtate: string;
  venue_country: string;
}

const raceApi: IRaceApi = {
  getNextRaceList: async num => {
    const response = await axios.get(
      `https://api.neds.com.au/rest/v1/racing/?method=nextraces&count=${num}`,
    );
    const raceList = response.data.data;
    return raceList;
  },
};

export default raceApi;
