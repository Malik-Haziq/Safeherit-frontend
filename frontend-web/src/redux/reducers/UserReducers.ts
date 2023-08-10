import { createReducer } from "@reduxjs/toolkit"

const initialState = {}

export const UserReducers = createReducer(initialState, (builder) => {
  builder.addCase("getUser", (state, action) => {})
})
