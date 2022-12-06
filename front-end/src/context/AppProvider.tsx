import React, { createContext, useEffect } from 'react';
import { WeatherState } from '../stores/reducers/weatherSlice';
import { UserState } from '../stores/reducers/userSlice';

import { useAppDispatch, useAppSelector } from '../stores/hooks';
import { getAllUsers, createUser, deleteUser } from '../stores/reducers/userSlice';
import { getWeather } from '../stores/reducers/weatherSlice';

export interface AppContextTypes {
  weatherStore: WeatherState;
  userStore: UserState;
  onCreateUser: (user: object) => void;
  onDeleteUser: (id: number | string) => void;
}

export const AppContext = createContext<AppContextTypes | null>(null);

const AppProvider: React.FC<React.ReactNode> = ({ children }) => {
  const dispatch = useAppDispatch();
  const userStore = useAppSelector<UserState>((state) => state.users);
  const weatherStore = useAppSelector<WeatherState>((state) => state.weather);

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getWeather());
  }, []);

  useEffect(() => {
    if (userStore.isCreated || userStore.isDeleted) {
      dispatch(getAllUsers());
    }
  }, [userStore.isCreated, userStore.isDeleted]);

  const onCreateUser = (user: object) => {
    dispatch(createUser(user));
  };

  const onDeleteUser = (id: number | string) => {
    dispatch(deleteUser(id));
  };

  return (
    <AppContext.Provider value={{ onCreateUser, onDeleteUser, userStore, weatherStore }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
