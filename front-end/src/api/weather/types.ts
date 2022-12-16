export interface LatLong {
  lat: string | number;
  long: string | number;
}

export interface WeatherAPIRequestParams extends LatLong {
  timezoneOffset: string;
}

export interface Wind {
  direction: string;
  speed: number;
}

export interface Dataseries {
  timepoint: number;
  cloudcover: number;
  lifted_index: number;
  prec_type: 'none' | 'snow' | 'rain' | 'frzr' | 'icep';
  prec_amount: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  temp2m: number;
  // relative humidity perception from 0 to 100 percentile
  rh2m: string;
  wind10m: Wind;
  weather: WeatherType;
}

type WeatherType =
  | 'pcloudyday'
  | 'pcloudynight'
  | 'mcloudyday'
  | 'mcloudynight'
  | 'cloudyday'
  | 'cloudynight'
  | 'humidday'
  | 'humidnight'
  | 'lightrainday'
  | 'lightrainnight'
  | 'oshowernight'
  | 'ishowernight'
  | 'lightsnownight'
  | 'rainnight'
  | 'snownight'
  | 'rainsnownight'
  | 'oshowerday'
  | 'ishowerday'
  | 'lightsnowday'
  | 'rainday'
  | 'snowday'
  | 'rainsnowday';

export interface WeatherAPIDataResponse {
  product: string;
  init: string;
  dataseries: Dataseries[];
}

export type WeatherAPIPerceptionType = 'none' | 'snow' | 'rain' | 'frzr' | 'icep';

export type CloudDensity =
  | '0-6%'
  | '6%-9%'
  | '19%-31%'
  | '31%-44%'
  | '44%-56%'
  | '56%-69%'
  | '69%-81%'
  | '81%-94%'
  | '94%-100%';

export type Windspeed =
  | 'calm'
  | 'light'
  | 'moderate'
  | 'fresh'
  | 'strong'
  | 'gale'
  | 'storm'
  | 'hurricane';

export interface WeatherData {
  clouds: CloudDensity;
  wind: { speed: Windspeed; direction: string };
  type: WeatherType;
  temp: number;
  perception: WeatherAPIPerceptionType;
  humidity: string;
}

export interface WeatherSummary {
  today: WeatherData[];
  tomorrow: WeatherData[];
}
