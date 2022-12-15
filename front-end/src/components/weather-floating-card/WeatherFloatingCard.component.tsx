import { Card, DegreeSection, WeatherCardPositioner } from './WeatherFloatingCard.styles';
import type { WeatherAPIPerceptionType, WeatherData } from '../../api/weather/types';

import { FlexContainer } from '../flex-container/FlexContainer';
import type { WeatherCardProps } from './WeatherFloatingCard.types';
import { useTime } from '../../hooks/use-time';
import { useWeatherSummaryData } from '../../providers/weather';

export const WeatherFloatingCard = () => {
  return (
    <WeatherCardPositioner>
      <Card>
        <WeatherFloatingCardContent />
      </Card>
    </WeatherCardPositioner>
  );
};

const WeatherFloatingCardContent = () => {
  const ctx = useWeatherSummaryData();
  switch (ctx.status) {
    case 'ERROR':
      return <p>Error fetching weather data.</p>;
    case 'LOCATION_LOADING':
      return <p>waiting on browser location permission</p>;
    case 'UNINITIALIZED':
    case 'WEATHER_DATA_LOADING':
    case 'LOCATION_GRANTED':
      return <p>Loading ...</p>;
    case 'WEATHER_DATA_SUCCESS':
      return <WeatherCard weather={ctx.data} />;
  }
};

const WeatherCard = (props: WeatherCardProps) => {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const time = useTime();
  const current = props.weather.today[0];

  return (
    <FlexContainer direction="column">
      <FlexContainer fullWidth justify="space-between">
        <p>{timezone}</p>
        <p>{time}</p>
      </FlexContainer>
      <DegreeSection fullWidth>
        <div>
          <h5>{current.temp}°C</h5>
          <p>{PERCEPTION_LABELS[current.perception]}</p>
        </div>
      </DegreeSection>
      <FlexContainer fullWidth justify="space-between">
        <FlexContainer direction="column">
          <p>
            💨&nbsp;&nbsp;{current.wind.speed} ({current.wind.direction})
          </p>
          <p>💧&nbsp;&nbsp;{current.humidity}</p>
          <p>☁️&nbsp;&nbsp;{current.clouds}</p>
        </FlexContainer>
        <FlexContainer direction="column" fullHeight>
          <FlexContainer fullWidth justify="space-between">
            <p>Today</p>
            <p>{getAverageTempForDay(props.weather.today)}°C</p>
          </FlexContainer>
          <FlexContainer justify="space-between">
            <p>Tomorrow</p>
            <p>{getAverageTempForDay(props.weather.tomorrow)}°C</p>
          </FlexContainer>
        </FlexContainer>
      </FlexContainer>
    </FlexContainer>
  );
};

function getAverageTempForDay(dayWeather: WeatherData[]) {
  const sum = dayWeather.reduce((sum, data) => sum + data.temp, 0);
  const avg = sum / dayWeather.length;
  return avg.toPrecision(2);
}

const PERCEPTION_LABELS: Record<WeatherAPIPerceptionType, string> = {
  frzr: '🥶 Freezing',
  icep: '❄️ Icy',
  none: '☀️ Clear',
  rain: '☔︎ Rain',
  snow: '🌨 Snow'
};
