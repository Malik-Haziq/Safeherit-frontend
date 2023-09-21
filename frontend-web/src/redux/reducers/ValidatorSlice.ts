import { createSlice } from "@reduxjs/toolkit"
import { getAllValidator, createValidator, findValidator } from "../actions/ValidatorAction"

const initialState = {
  name: "",
  id: "",
  primary_email: "",
  backup_email: "",
  backup_email2: "",
  phone_number: "",
  backup_phone_number: "",
  facebook_link: "",
  instagram_username: "",
  twitter_username: "",
  personalized_message: "",
  profile_image: "",
  validator_array: [{}],
}

export const slice = createSlice({
  name: "validator",
  initialState,
  reducers: {
    addValidator: (state, action) => {
      state.validator_array = [...state.validator_array, action.payload]
    }
  },
  extraReducers(builder) {
    builder.addCase(getAllValidator.fulfilled, (state, action) => {
      state.validator_array = action?.payload?.data?.data || []
    })
    builder.addCase(createValidator.fulfilled, (state, action) => {
      state.id= action?.payload?.data?.id || ""
      state.name= action?.payload?.data?.name || ""
      state.primary_email= action?.payload?.data?.data?.primary_email || ""
      state.backup_email= action?.payload?.data?.data?.backup_email || ""
      state.backup_email2= action?.payload?.data?.data?.backup_email2 || ""
      state.phone_number= action?.payload?.data?.data?.phone_number || ""
      state.backup_phone_number= action?.payload?.data?.data?.backup_phone_number || ""
      state.facebook_link= action?.payload?.data?.data?.facebook_link || ""
      state.instagram_username= action?.payload?.data?.data?.instagram_username || ""
      state.twitter_username= action?.payload?.data?.data?.twitter_username || ""
      state.personalized_message= action?.payload?.data?.data?.personalized_message || ""
    })
    builder.addCase(findValidator.fulfilled, (state, action) => {
      state.id= action?.payload?.data?.id || ""
      state.name= action?.payload?.data?.name || ""
      state.primary_email= action?.payload?.data?.data?.primary_email || ""
      state.backup_email= action?.payload?.data?.data?.backup_email || ""
      state.backup_email2= action?.payload?.data?.data?.backup_email2 || ""
      state.phone_number= action?.payload?.data?.data?.phone_number || ""
      state.backup_phone_number= action?.payload?.data?.data?.backup_phone_number || ""
      state.facebook_link= action?.payload?.data?.data?.facebook_link || ""
      state.instagram_username= action?.payload?.data?.data?.instagram_username || ""
      state.twitter_username= action?.payload?.data?.data?.twitter_username || ""
      state.personalized_message= action?.payload?.data?.data?.personalized_message || ""
    })
  },
})

export const {addValidator} = slice.actions

export default slice.reducer
