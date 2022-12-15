import { WeatherAPIPerceptionType, WeatherData } from '../../api/weather/types';
import { useTime } from '../../hooks/use-time';
import { useWeatherData } from '../../hooks/use-weather-data';
import { FlexContainer } from '../flex-container/FlexContainer';
import {
  Card,
  CardTitle,
  DegreeSection,
  WeatherCardPositioner
} from './WeatherFloatingCard.styles';
import { WeatherCardProps, WeatherFloatingCardContentProps } from './WeatherFloatingCard.types';

export const WeatherFloatingCard = () => {
  const weather = useWeatherData();

  return (
    <WeatherCardPositioner>
      <Card>
        <WeatherFloatingCardContent weather={weather} />
      </Card>
    </WeatherCardPositioner>
  );
};

const WeatherFloatingCardContent = (props: WeatherFloatingCardContentProps) => {
  switch (props.weather.status) {
    case 'ERROR':
      return <p>Error fetching weather data.</p>;
    case 'LOADING':
    case 'UNINITIALIZED':
      return <p>Loading ...</p>;
    case 'SUCCESS':
      return <WeatherCard weather={props.weather.data} />;
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
