export type WeatherItemProps = {
  wind10m: object | any;
  weather: string;
  rh2m: string;
  temp2m: number;
};

export type WeatherProps = {
  data: Array<WeatherItemProps>;
};
