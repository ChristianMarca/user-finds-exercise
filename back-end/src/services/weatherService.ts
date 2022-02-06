import axios from "axios";
import { WeatherDataSeries } from "./api.types";

export class WeatherService {
  getWeather(
    lat: string | number,
    long: string | number
  ): Promise<WeatherDataSeries> {
    return axios
      .get(
        `http://www.7timer.info/bin/api.pl?lon=${long}&lat=${lat}&product=civil&output=json`
      )
      .then(({ data }) => data);
  }
}
