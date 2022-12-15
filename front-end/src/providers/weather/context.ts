import type { WeatherSummaryContextValue } from './types';
import { createContext } from 'react';

export const WeatherSummaryContext = createContext<WeatherSummaryContextValue | undefined>(
  undefined
);
