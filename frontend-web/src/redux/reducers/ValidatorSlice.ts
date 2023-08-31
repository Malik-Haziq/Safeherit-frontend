import { createSlice } from "@reduxjs/toolkit"
import { getAllValidator } from "../actions/ValidatorAction"

const initialState = {
  name: "",
  primary_email: "",
  backup_email: "",
  backup_email2: "",
  phone_number: "",
  backup_phone_number: "",
  facebook_link: "",
  instagram_username: "",
  twitter_username: "",
  personalized_message: "",
  validator_array: [{}]
}

export const slice = createSlice({
  name: "validator",
  initialState,
  reducers: {
  },
  extraReducers(builder) {
    builder.addCase(getAllValidator.fulfilled, (state, action) => {
      state.validator_array = action?.payload?.data?.data || []
    })
  },
})

export const {  } = slice.actions

export default slice.reducer