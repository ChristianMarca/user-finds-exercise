import { WeatherSummaryContext } from './context';
import { useReducer } from 'react';
import { weatherSummaryReducer } from './reducer';
import type { WeatherSummaryContextProviderProps } from './types';

export const WeatherSummaryContextProvider = (props: WeatherSummaryContextProviderProps) => {
  const [state, dispatch] = useReducer(weatherSummaryReducer, { status: 'UNINITIALIZED' });
  const value = { state, dispatch };
  return (
    <WeatherSummaryContext.Provider value={value}>{props.children}</WeatherSummaryContext.Provider>
  );
};
