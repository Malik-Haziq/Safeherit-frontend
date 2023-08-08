import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from './slice';

export const store = configureStore({
  reducer: {
    // root: counterReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType <typeof store.getState>;