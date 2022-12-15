import { WeatherSummary } from '../../api/weather/types';

export type WeatherAPIStatus = 'LOADING' | 'SUCCESS' | 'ERROR' | 'UNINITIALIZED';

export type WeatherSummaryContext =
  | {
      data?: WeatherSummary;
      status: Exclude<WeatherAPIStatus, 'SUCCESS'>;
    }
  | {
      data: WeatherSummary;
      status: 'SUCCESS';
    };
export type WeatherFloatingCardContentProps = {
  weather: WeatherSummaryContext;
};

export type WeatherCardProps = {
  weather: WeatherSummary;
};
