import { useMemo } from "react";
import { WeatherData } from "../../api/weather/types";
import { useWeatherData } from "../../hooks/use-weather-data";
import {
  Card,
  CardTitle,
  WeatherCardPositioner,
} from "./WeaherFloatingCard.styles";
import { WeatherFloatingCardContentProps } from "./WeatherFloatingCard.types";

export const WeatherFloatingCard = () => {
  const weather = useWeatherData();

  return (
    <WeatherCardPositioner>
      <Card>
        <CardTitle>Weather Summary</CardTitle>
        <WeatherFloatingCardContent weather={weather} />
      </Card>
    </WeatherCardPositioner>
  );
};

const WeatherFloatingCardContent = (props: WeatherFloatingCardContentProps) => {
  switch (props.weather.status) {
    case "ERROR":
      return <p>Error fetching weather data.</p>;
    case "LOADING":
    case "UNINITIALIZED":
      return <p>Loading ...</p>;
    case "SUCCESS":
      return <WeatherDaySection day={props.weather.data.today} />;
  }
};

const WeatherDaySection = (props: { day: WeatherData[] }) => {
  const avgTemp = useMemo(() => {
    const sum = props.day.reduce((sum, d) => sum + d.temp, 0);
    const avg = sum / props.day.length;
    return avg.toPrecision(2);
  }, [props.day]);
  return (
    <div>
      <p>
        Today Avg. Temp: <b>{avgTemp}&#x2103;</b>
      </p>
    </div>
  );
};
