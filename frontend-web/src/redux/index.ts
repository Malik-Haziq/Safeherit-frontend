import { combineReducers, configureStore } from "@reduxjs/toolkit"
import user from "./reducers/UserSlice"
import validator from "./reducers/ValidatorSlice"
import beneficiary from "./reducers/BeneficiarySlice"
import asset from "./reducers/AssetSlice"
import dashboard from "./reducers/DashboardSlice"
import admin from "./reducers/AdminSlice"
import loader from "./reducers/LoaderSlice"

// const rootPersistConfig = {
//   key: "data",
//   storage,
// }

const rootReducer = combineReducers({
  user: user,
  loader: loader,
  validator: validator,
  beneficiary: beneficiary,
  asset: asset,
  dashboard: dashboard,
  admin: admin,
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
