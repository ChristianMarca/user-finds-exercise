import type { Dispatch, ReactNode } from 'react';
import type { LatLong, WeatherSummary } from '../../api/weather/types';

type WeatherSummaryContextStatus =
  | 'UNINITIALIZED'
  | 'ERROR'
  | 'WEATHER_DATA_SUCCESS'
  | 'WEATHER_DATA_LOADING'
  | 'LOCATION_GRANTED'
  | 'LOCATION_LOADING';

export type WeatherSummaryContextState =
  | {
      data?: WeatherSummary;
      location?: LatLong;
      status: Exclude<WeatherSummaryContextStatus, 'WEATHER_DATA_SUCCESS' | 'LOCATION_GRANTED'>;
    }
  | {
      data?: WeatherSummary;
      location: LatLong;
      status: 'LOCATION_GRANTED';
    }
  | {
      data: WeatherSummary;
      location: LatLong;
      status: 'WEATHER_DATA_SUCCESS';
    };

export type WeatherSummaryContextActions =
  | { type: 'fetch-location' }
  | { type: 'fetch-location-success'; location: LatLong }
  | { type: 'fetch-location-error' }
  | { type: 'fetch-weather-summary' }
  | { type: 'fetch-weather-summary-success'; data: WeatherSummary; location: LatLong }
  | { type: 'fetch-weather-summary-error' };

export type WeatherSummaryContextValue = {
  state: WeatherSummaryContextState;
  dispatch: Dispatch<WeatherSummaryContextActions>;
};

export type WeatherSummaryContextProviderProps = {
  children: ReactNode;
};
