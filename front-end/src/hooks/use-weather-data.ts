import { useEffect, useState } from 'react';
import { WeatherService } from '../api/weather/service';
import { WeatherSummaryContext } from '../components/weather-floating-card/WeatherFloatingCard.types';
import { getTimezoneOffsetInHours } from '../utils/get-timezone-offset';

export function useWeatherData() {
  const [context, setContext] = useState<WeatherSummaryContext>({
    status: 'UNINITIALIZED'
  });

  useEffect(() => {
    setContext({ status: 'LOADING' });
    navigator.geolocation.getCurrentPosition(onSuccessGrantOfLocation);
  }, []);

  function onSuccessGrantOfLocation(pos: GeolocationPosition) {
    WeatherService.fetchLocation({
      lat: pos.coords.latitude,
      long: pos.coords.longitude,
      timezoneOffset: getTimezoneOffsetInHours()
    })
      .then((d) => {
        setContext({ status: 'SUCCESS', data: d });
      })
      .catch(() => {
        setContext({ status: 'ERROR' });
      });
  }
  return context;
}
