import {
  CloudDensity,
  WeatherAPIDataResponse,
  WeatherData,
  WeatherSummary,
  Windspeed
} from './types';

export function transformWeatherDataFromWeatherAPIResponse(
  data: WeatherAPIDataResponse
): WeatherSummary {
  const currentHours = new Date().getHours();
  const tomorrowDayStart = 24 - currentHours;
  const today = transformWeatherDayDataFromWeatherAPIDataSeries(data.dataseries, [
    0,
    tomorrowDayStart
  ]);
  const tomorrow = transformWeatherDayDataFromWeatherAPIDataSeries(data.dataseries, [
    tomorrowDayStart,
    tomorrowDayStart + 24
  ]);
  return { today, tomorrow };
}

function transformWeatherDayDataFromWeatherAPIDataSeries(
  series: WeatherAPIDataResponse['dataseries'],
  range: [number, number]
): WeatherData[] {
  const filteredSeries = series.filter((d) => d.timepoint >= range[0] && d.timepoint <= range[1]);

  const transformedSeries = filteredSeries.map(transformDataSeriesFromWeatherAPI);

  return transformedSeries;
}

function transformDataSeriesFromWeatherAPI(d: WeatherAPIDataResponse['dataseries'][number]) {
  const clouds = transformCloudsPercentageFromWeatherAPIDataSeries(d.cloudcover);
  const wind = {
    speed: transformWindspeedFromWeatherAPIDataSeries(d.wind10m.speed),
    direction: d.wind10m.direction
  };
  const type = d.weather;
  const temp = d.temp2m;
  const perception = d.prec_type;
  const humidity = d.rh2m;
  return { clouds, wind, type, temp, perception, humidity };
}

function transformWindspeedFromWeatherAPIDataSeries(windspeedValue: number): Windspeed {
  switch (windspeedValue) {
    case 1:
    default:
      return 'calm';
    case 2:
      return 'light';
    case 3:
      return 'moderate';
    case 4:
      return 'fresh';
    case 5:
      return 'strong';
    case 6:
      return 'gale';
    case 7:
      return 'storm';
    case 8:
      return 'hurricane';
  }
}

function transformCloudsPercentageFromWeatherAPIDataSeries(cloudcover: number): CloudDensity {
  switch (cloudcover) {
    case 1:
    default:
      return '0-6%';
    case 2:
      return '6%-9%';
    case 3:
      return '19%-31%';
    case 4:
      return '31%-44%';
    case 5:
      return '44%-56%';
    case 6:
      return '56%-69%';
    case 7:
      return '69%-81%';
    case 8:
      return '81%-94%';
    case 9:
      return '94%-100%';
  }
}
