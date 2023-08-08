import { configureStore } from '@reduxjs/toolkit';
import { UserReducers } from './reducers/UserReducers';

export const store = configureStore({
  reducer: {
    user: UserReducers,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType <typeof store.getState>;