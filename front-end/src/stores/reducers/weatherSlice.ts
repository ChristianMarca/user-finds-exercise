import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getWeather = createAsyncThunk('weather/location', async () => {
  const response = await axios.get('http://localhost:3001/api/weather/location');

  return response.data.weatherData || response.data;
});

export interface WeatherState {
  weather: any;
  errors: any;
}

const initialState: WeatherState = {
  weather: null,
  errors: null
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getWeather.fulfilled, (state, action) => {
      state.weather = action.payload;
    });
  }
});

export default weatherSlice.reducer;
