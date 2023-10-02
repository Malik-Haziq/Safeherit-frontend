import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  message: "",
  variant: undefined
}

export const slice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    showToast: (state, action) => {
      state.message = action.payload.message
      state.variant = action.payload.variant
    }
  },
})

export const {showToast} = slice.actions

export default slice.reducer
