import type { WeatherSummaryContextActions, WeatherSummaryContextState } from './types';

export function weatherSummaryReducer(
  state: WeatherSummaryContextState,
  action: WeatherSummaryContextActions
): WeatherSummaryContextState {
  switch (action.type) {
    case 'fetch-location': {
      return { status: 'LOCATION_LOADING' };
    }
    case 'fetch-location-success': {
      return { status: 'LOCATION_GRANTED', location: action.location };
    }
    case 'fetch-location-error': {
      return { status: 'ERROR' };
    }
    case 'fetch-weather-summary': {
      return { status: 'WEATHER_DATA_LOADING' };
    }
    case 'fetch-weather-summary-success': {
      return { status: 'WEATHER_DATA_SUCCESS', data: action.data, location: action.location };
    }
    case 'fetch-weather-summary-error': {
      return { status: 'ERROR' };
    }
  }
}
