import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import user from "./reducers/UserReducers"
import sessionStorage from "redux-persist/es/storage/session"

const rootPersistConfig = {
  key: 'root',
  storage,
}
const sessionPersistConfig = {
  key: 'root',
  storage: sessionStorage,
}
const rootReducer = combineReducers({ 
  user: persistReducer(sessionPersistConfig, user),
})
// const persistedReducer = persistReducer(rootPersistConfig, rootReducer)

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export const persistor = persistStore(store)
