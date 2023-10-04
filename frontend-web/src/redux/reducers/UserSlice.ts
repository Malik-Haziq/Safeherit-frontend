import { createSlice } from "@reduxjs/toolkit"
import { login, logout, signup, getUser, updateUser } from "../actions/UserActions"

const initialState = {
  email: "",
  name: "",
  photo: "",
  phone: "",
  access: "",
  active: false,
  token: "",
  displayName: "",
  language: "",
  profile_image: "",
  loading: false,
  _beneficiaryOf: [],
  isBeneficiary: false,
  isOwner: true,
  isValidator: false,
  role: "none"
}

export const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateName: (state, action) => {
      state.name = action.payload
    },
    updateActive: (state, action) => {
      state.active = action.payload
    },
    updateRole: (state, action) => {
      state.role = action.payload
    },
    setToken: (state, action) => {
      state.token = action.payload;
    }
  },
  extraReducers(builder) {
    builder.addCase(login.fulfilled, (state, action) => {
      state.email = action.payload.user.email || ""
      state.displayName = action.payload.user.displayName || ""
      state.photo = action.payload.user.photoURL || ""
      state.phone = action.payload.user.phoneNumber || ""
    })
    builder.addCase(signup.fulfilled, (state, action) => {
      state.email = action.payload.user.email || ""
      state.name = action.payload.user.displayName || ""
      state.photo = action.payload.user.photoURL || ""
      state.phone = action.payload.user.phoneNumber || ""
      state.active = true
    })
    builder.addCase(logout.fulfilled, (state, action) => {
      return initialState
    })
    builder.addCase(getUser.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.loading = false
      state.displayName = action.payload.data.data.displayName
      state.language = action.payload.data.data.language
      state.profile_image = action.payload.data.data.profile_image
      state._beneficiaryOf = action.payload.data.data._beneficiaryOf
      state.isBeneficiary = action.payload.data.data.isBeneficiary
      state.isOwner = action.payload.data.data.isOwner
      state.isValidator = action.payload.data.data.isValidator
    })
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.displayName = action.payload.data.data.displayName
      state.language = action.payload.data.data.language
      state.profile_image = action.payload.data.data.profile_image
    })
  },
})

export const { updateName, updateActive, setToken, updateRole } = slice.actions

export default slice.reducer
