import axios from "axios";
import { API_BASE_URL } from "../config";
import { transformWeatherDataFromWeatherAPIResponse } from "./transformers";
import {
  WeatherAPIRequestParams,
  WeatherAPIDataResponse,
  WeatherSummary,
} from "./types";

async function fetchLocation(
  params: WeatherAPIRequestParams
): Promise<WeatherSummary> {
  const response = await axios.get<{ weatherData: WeatherAPIDataResponse }>(
    `${API_BASE_URL}/api/weather/location`,
    {
      params,
    }
  );
  const weatherData = response.data.weatherData;
  return transformWeatherDataFromWeatherAPIResponse(weatherData);
}

export const WeatherService = {
  fetchLocation,
} as const;
