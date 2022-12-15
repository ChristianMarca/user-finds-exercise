import { useContext, useEffect } from 'react';
import { WeatherService } from '../../api/weather/service';
import { WeatherSummaryContext } from './context';
import { getTimezoneOffsetInHours } from '../../utils/get-timezone-offset';

export function useWeatherSummaryData() {
  const context = useContext(WeatherSummaryContext);
  if (context === undefined) {
    throw new Error('Incorrect usage of `useWeatherSummaryData`');
  }
  const { state, dispatch } = context;

  /**
   * Fetch user location from geolocation api then try to get user weather
   * data based on his location
   */
  useEffect(() => {
    dispatch({ type: 'fetch-location' });
    navigator.geolocation.getCurrentPosition(onSuccessGrantOfLocation);
  }, []);

  const onSuccessGrantOfLocation = async (pos: GeolocationPosition) => {
    const location = {
      long: pos.coords.longitude,
      lat: pos.coords.latitude
    };
    dispatch({ type: 'fetch-location-success', location });

    dispatch({ type: 'fetch-weather-summary' });
    try {
      const data = await fetchWeatherSummary(pos);
      dispatch({ type: 'fetch-weather-summary-success', location, data });
    } catch (e) {
      dispatch({ type: 'fetch-weather-summary-error' });
    }
  };

  return state;
}

function fetchWeatherSummary(pos: GeolocationPosition) {
  return WeatherService.fetchLocation({
    lat: pos.coords.latitude,
    long: pos.coords.longitude,
    timezoneOffset: getTimezoneOffsetInHours()
  });
}
