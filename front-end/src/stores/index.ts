import { configureStore } from '@reduxjs/toolkit';

import users from './reducers/userSlice';
import weather from './reducers/weatherSlice';

export const store = configureStore({
  reducer: {
    users,
    weather
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
