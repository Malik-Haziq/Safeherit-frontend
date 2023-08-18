import { configureStore } from "@reduxjs/toolkit"
import user from "./reducers/UserReducers"

export const store = configureStore({
  reducer: {
    user: user,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
