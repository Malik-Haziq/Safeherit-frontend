import { createSlice } from "@reduxjs/toolkit"

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
  validator_array: []
}

export const slice = createSlice({
  name: "validator",
  initialState,
  reducers: {
  },
  extraReducers(builder) {
  },
})

export const {  } = slice.actions

export default slice.reducer