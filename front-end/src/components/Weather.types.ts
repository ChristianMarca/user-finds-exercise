export type WeatherItemProps = {
  wind10m: object;
  weather: string;
  rh2m: string;
  temp2m: number;
};

export type WeatherProps = {
  data: Array<any>;
};
