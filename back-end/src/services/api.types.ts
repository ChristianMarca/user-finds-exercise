export type WeatherDataSeries = {
  timepoint: number;
  cloudcover: number;
  seeing: number;
  transparency: number;
  lifted_index: number;
  rh2m: number;
  wind10m: {
    direction: string;
    speed: number;
  };
  temp2m: number;
  prec_type: string;
};

export type WeatherDto = {
  product: string;
  init: string;
  dataseries: WeatherDataSeries[];
};
