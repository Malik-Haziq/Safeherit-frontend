import { configureStore } from "@reduxjs/toolkit"
import user from "./reducers/UserReducers"

export const store = configureStore({
  reducer: {
    user: user,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
