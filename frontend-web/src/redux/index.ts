import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import user from "./reducers/UserSlice"
import validator from "./reducers/ValidatorSlice"
import beneficiary from "./reducers/BeneficiarySlice"
import sessionStorage from "redux-persist/es/storage/session"

const rootPersistConfig = {
  key: 'data',
  storage,
}
const sessionPersistConfig = {
  key: 'root',
  storage: sessionStorage,
}
const rootReducer = combineReducers({ 
  user: persistReducer(sessionPersistConfig, user),
  validator: persistReducer(rootPersistConfig, validator),
  beneficiary: persistReducer(rootPersistConfig, beneficiary),
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
