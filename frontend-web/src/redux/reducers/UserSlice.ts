import { createSlice } from "@reduxjs/toolkit"
import { login, logout, signup, getUser, updateUser } from "../actions/UserActions"
import { SelectOption } from "@/types"

interface UserState {
  email: string
  name: string
  photo: string
  phone: string
  access: string
  active: boolean
  token: string
  displayName: string
  language: string
  profile_image: string
  loading: boolean
  _beneficiaryOf: SelectOption[]
  _validatorOf: SelectOption[]
  isBeneficiary: boolean
  isOwner: boolean
  isValidator: boolean
  role: string
  selectedRoleUser: {[key: string]: any}
  userMap: {[key: string]: any}
}
const initialState: UserState = {
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
  _validatorOf: [],
  isBeneficiary: false,
  isOwner: true,
  isValidator: false,
  role: "none",
  selectedRoleUser: {},
  userMap: {},
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
    updateRoleUser: (state, action) => {
      state.selectedRoleUser = action.payload
    },
    resetMapper: (state) => {
      state.userMap = {}
    },
    resetBeneficiaryOf: (state) => {
      state._beneficiaryOf = []
    },
    resetValidatorOf: (state) => {
      state._validatorOf = []
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
      state.isBeneficiary = action.payload.data.data.isBeneficiary
      state.isOwner = action.payload.data.data.isOwner
      state.isValidator = action.payload.data.data.isValidator
      state._beneficiaryOf = action.payload.data.data._beneficiaryOf

      let beneficiaryOfArray: SelectOption[] = []
      const beneficiaryMapper: {[key: string]: any} = {};

      if (action.payload.data.data._beneficiaryOf) {
        action.payload.data.data._beneficiaryOf.forEach((element: any) => {
          beneficiaryOfArray.push({
            label: element.ownerEmail + " - " + element.ownerName,
            value: element.beneficiaryId,
          })
          beneficiaryMapper[element.beneficiaryId] = {
            ownerEmail: element.ownerEmail,
            beneficiaryId: element.beneficiaryId,
            ownerName: element.ownerName,
          }
        })
        state.userMap = beneficiaryMapper
        state._beneficiaryOf = beneficiaryOfArray
      }

      let validatorOfArray: SelectOption[] = []
      const validatorMapper: {[key: string]: any} = {};

      if (action.payload.data.data._validatorOf) {
        action.payload.data.data._validatorOf.forEach((element: any) => {
          validatorOfArray.push({
            label: element.ownerEmail + " - " + element.ownerName,
            value: element.validatorId,
          })
          validatorMapper[element.validatorId] = {
            ownerEmail: element.ownerEmail,
            validatorId: element.validatorId,
            ownerName: element.ownerName,
          }
        })
        state.userMap = validatorMapper
        state._validatorOf = validatorOfArray
      }
    })
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.displayName = action.payload.data.data.displayName
      state.language = action.payload.data.data.language
      state.profile_image = action.payload.data.data.profile_image
    })
  },
})

export const { updateName, updateActive, setToken, updateRole, updateRoleUser, resetMapper, resetBeneficiaryOf, resetValidatorOf } = slice.actions

export default slice.reducer
