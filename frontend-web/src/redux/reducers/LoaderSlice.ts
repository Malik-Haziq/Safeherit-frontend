import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  loaderVisibility: false,
}

export const slice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    setLoaderVisibility: (state, action) => {
        state.loaderVisibility = action.payload
    },
  }
})

export const { setLoaderVisibility } = slice.actions

export default slice.reducer
